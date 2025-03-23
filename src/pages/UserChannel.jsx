import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createChannel, updateChannel, deleteChannel } from "../redux/channelSlice";
import { deleteVideo, updateVideo } from "../redux/videoSlice";
import useFetchUserChannel from "../hooks/useFetchUserChannel";
import "../styles/UserChannel.css";

const videoTypes = [
  "Sci-Fi", "Adventure", "Sports", "Healthcare", "Anime", "Cartoon",
  "Politics", "News", "Entertainment", "Knowledge", "Gaming", "Movies",
  "TV Shows", "Vlogs", "Podcasts", "Tech", "Music", "Education", "Fashion",
  "Lifestyle", "Fitness", "Cooking", "DIY", "Business", "Finance", "Science",
  "Nature", "History", "Religion", "Culture", "Travel", "Food", "Documentary",
  "Comedy", "Drama", "Action", "Fantasy", "Calm", "Horror", "Thriller", "Romance",
  "Mystery", "Biography", "Crime", "Western", "Musical", "War", "Supernatural",
  "Family", "Animation", "Superhero", "Spy"
];

function UChannel() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userChannel, loading, error } = useFetchUserChannel(userId);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    banner: "",
  });

  const [videos, setVideos] = useState([]); // Store videos in state

  useEffect(() => {
    if (userChannel) {
      setFormData({
        name: userChannel.name,
        description: userChannel.description,
        logo: userChannel.logo,
        banner: userChannel.banner,
      });

      setVideos(userChannel.videos || []); // Update video list
    }
  }, [userChannel]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userChannel) {
      dispatch(updateChannel({ id: userChannel._id, updatedData: formData }));
    } else {
      dispatch(createChannel({ ...formData, owner: userId }));
    }
  };

  const handleDelete = () => {
    dispatch(deleteChannel(userChannel._id));
    navigate("/");
  };

  const handleDeleteVideo = (videoId) => {
    dispatch(deleteVideo(videoId));
    setVideos(videos.filter((video) => video._id !== videoId)); // Remove from UI
  };

  const handleVideoChange = (videoId, field, value) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video._id === videoId ? { ...video, [field]: value } : video
      )
    );
  };

  const handleUpdateVideo = (videoId) => {
    const videoToUpdate = videos.find((video) => video._id === videoId);
    dispatch(updateVideo({ id: videoId, updatedData: videoToUpdate }));
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="channel">
      {userChannel ? (
        <>
          <div className="channel-banner">
            <img src={userChannel.banner} alt="Channel Banner" className="banner-image" />
          </div>
          <div className="channel-header">
            <img src={userChannel.logo} alt="Channel Logo" className="channel-logo" />
            <div className="channel-info">
              <h1>{userChannel.name}</h1>
              <p>{userChannel.subscribers?.toLocaleString()} Subscribers</p>
              <p>{videos.length} Videos</p>
            </div>
          </div>
          <div className="channel-description">
            <h2>About this channel</h2>
            <p>{userChannel.description}</p>
          </div>
          <div className="channel-videos">
            <h2>Videos</h2>
            <div className="video-list">
              {videos.map((video) => (
                <div className="video-card" key={video._id}>
                  <img src={video.thumbnailUrl || "fallback-thumbnail.jpg"} alt={video.title || "Untitled"} />
                  <input
                    type="text"
                    value={video.title}
                    onChange={(e) => handleVideoChange(video._id, "title", e.target.value)}
                  />
                  <input
                    type="text"
                    value={video.tags}
                    onChange={(e) => handleVideoChange(video._id, "tags", e.target.value)}
                  />
                  {/* Video Type Dropdown */}
                  <select
                    value={video.type}
                    onChange={(e) => handleVideoChange(video._id, "type", e.target.value)}
                  >
                    {videoTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <p>{video.views?.toLocaleString()} views</p>
                  <p>{video.likes} Likes | {video.dislikes} Dislikes</p>
                  <button onClick={() => handleUpdateVideo(video._id)} className="update-video-btn">
                    Update Video
                  </button>
                  <button onClick={() => handleDeleteVideo(video._id)} className="delete-video-btn">
                    Delete Video
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="channel-management">
            <button onClick={handleSubmit} className="edit-btn">
              Edit Channel
            </button>
            <button onClick={handleDelete} className="delete-btn">
              Delete Channel
            </button>
          </div>
        </>
      ) : (
        <div className="create-channel">
          <h2>Create Your Channel</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Channel Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input type="text" name="logo" placeholder="Logo URL" value={formData.logo} onChange={handleChange} required />
            <input type="text" name="banner" placeholder="Banner URL" value={formData.banner} onChange={handleChange} required />
            <button type="submit">Create Channel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UChannel;
