import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createChannel, updateChannel, deleteChannel } from "../redux/channelSlice";
import { deleteVideo, updateVideo } from "../redux/videoSlice";
import useFetchUserChannel from "../hooks/useFetchUserChannel";
import "../styles/UserChannel.css";

// List of video types used in the dropdown menu
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
  const { userId } = useParams(); // Extract userId from the URL parameters
  const navigate = useNavigate(); // Hook for programmatic navigation
  const dispatch = useDispatch(); // Redux dispatch function

  // Fetch the user's channel data
  const { userChannel, loading, error } = useFetchUserChannel(userId);

  // Form state for channel details
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    banner: "",
  });

  // State to store the videos of the channel
  const [videos, setVideos] = useState([]);

  // Populate form fields and videos when the userChannel data is available
  useEffect(() => {
    if (userChannel) {
      setFormData({
        name: userChannel.name,
        description: userChannel.description,
        logo: userChannel.logo,
        banner: userChannel.banner,
      });

      setVideos(userChannel.videos || []); // Ensure videos are set properly
    }
  }, [userChannel]);

  // Handle input changes in the channel form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for creating or updating a channel
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userChannel) {
      dispatch(updateChannel({ id: userChannel._id, updatedData: formData }));
    } else {
      dispatch(createChannel({ ...formData, owner: userId }));
    }
  };

  // Handle deleting the entire channel
  const handleDelete = () => {
    dispatch(deleteChannel(userChannel._id));
    navigate("/"); // Redirect to home after deletion
  };

  // Handle deleting a specific video
  const handleDeleteVideo = (videoId) => {
    dispatch(deleteVideo(videoId));
    setVideos(videos.filter((video) => video._id !== videoId)); // Remove deleted video from UI
  };

  // Handle updating video details in local state
  const handleVideoChange = (videoId, field, value) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video._id === videoId ? { ...video, [field]: value } : video
      )
    );
  };

  // Dispatch update action for a specific video
  const handleUpdateVideo = (videoId) => {
    const videoToUpdate = videos.find((video) => video._id === videoId);
    dispatch(updateVideo({ id: videoId, updatedData: videoToUpdate }));
  };

  // Show loading or error states if needed
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="channel">
      {userChannel ? (
        <>
          {/* Channel Banner */}
          <div className="channel-banner">
            <img src={userChannel.banner} alt="Channel Banner" className="banner-image" />
          </div>

          {/* Channel Header Section */}
          <div className="channel-header">
            <img src={userChannel.logo} alt="Channel Logo" className="channel-logo" />
            <div className="channel-info">
              <h1>{userChannel.name}</h1>
              <p>{userChannel.subscribers?.toLocaleString()} Subscribers</p>
              <p>{videos.length} Videos</p>
            </div>
          </div>

          {/* Channel Description */}
          <div className="channel-description">
            <h2>About this channel</h2>
            <p>{userChannel.description}</p>
          </div>

          {/* Videos Section */}
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
                  <textarea
                    value={video.description || ""}
                    onChange={(e) => handleVideoChange(video._id, "description", e.target.value)}
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

          {/* Channel Management Buttons */}
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
        // Channel Creation Form
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
