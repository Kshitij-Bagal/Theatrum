import React, { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import VideoCard from "../components/VideoCard.jsx";
import Comments from "../components/Comments.jsx";
import VideoDescription from "../components/VideoDescription.jsx";
import "../styles/VideoPlayer.css";
import { fetchChannels } from "../redux/channelSlice";
import { FaEye, FaThumbsUp } from "react-icons/fa";

function VideoPlayer() {
  const dispatch = useDispatch();
  const { channelId, videoId } = useParams();
  const videoRef = useRef(null);
  const [Channel, setChannel] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [theaterMode, setTheaterMode] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const baseUrl = import.meta.env.VITE_SERVER_URL;

  // Fetch channel list when component mounts
  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  // Select the current channel from Redux store
  const channel = useSelector((state) =>
    state.channel?.channels?.find((ch) => String(ch._id) === channelId)
  );

  // Find the current video in the channel's videos list
  const video = channel?.videos?.find((vid) => String(vid._id) === videoId);
  
  // Filter out the current video to display recommended videos
  const recommendedVideos = channel?.videos?.filter((vid) => vid._id !== videoId);

  // Fetch channel details from backend when channelId changes
  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/channels/${channelId}`);
        if (!response.ok) throw new Error("Failed to fetch channel");
        const data = await response.json();
        setChannel(data);
      } catch (error) {
        console.error("Error fetching channel:", error);
      }
    };
    fetchChannelData();
  }, [channelId]);

  // Attach event listeners for video metadata and time updates
  useEffect(() => {
    if (!videoRef.current) return;
    const videoElement = videoRef.current;
    const handleMetadataLoad = () => setCurrentTime(videoRef.current.duration);
    const handleTimeUpdate = () => setCurrentTime(videoRef.current.currentTime);

    videoRef.current.addEventListener("loadedmetadata", handleMetadataLoad);
    videoRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadedmetadata", handleMetadataLoad);
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [video]);

  // Store watched video history in sessionStorage (only last 10 videos)
  useEffect(() => {
    if (!video) return;

    const watchedHistory = JSON.parse(sessionStorage.getItem("watchedVideos")) || [];
    const isAlreadyWatched = watchedHistory.some((item) => item.id === videoId);
    
    if (!isAlreadyWatched) {
      const newHistory = [
        { id: videoId, title: video.title, timestamp: new Date().toLocaleString() },
        ...watchedHistory
      ];
      sessionStorage.setItem("watchedVideos", JSON.stringify(newHistory.slice(0, 10)));
    }
  }, [video, videoId]);

  // Seek video forward or backward
  const seekVideo = (seconds) => {
    if (videoRef.current) videoRef.current.currentTime += seconds;
  };

  // Toggle theater mode (fullscreen-like layout)
  const handleTheaterMode = () => {
    setTheaterMode((prev) => !prev);
    document.documentElement.classList.toggle("theater-active");
  };

  // Increment video view count in backend when video is played
  const handleVideoPlay = async () => {
    try {
      await fetch(`${baseUrl}/api/videos/${video._id}/view`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Failed to update view count:", error);
    }
  };

  // Toggle focus mode (dim background)
  const handleFocusMode = () => {
    setFocusMode((prev) => !prev);
    document.body.classList.toggle("focus-mode-active", !focusMode);
  };

  // Adjust video playback speed
  const handleSpeedChange = (speed) => {
    if (videoRef.current) videoRef.current.playbackRate = speed;
  };

  if (!channel) return <div>Loading channel...</div>;
  if (!video) return <div>Loading video...</div>;

  const videoUrl = `${baseUrl}/stream-video/${video._id}`;

  // Component to display recommended videos
  const VideoPlayerCard = ({ video }) => {
    return (
      <div className="video-card">
        <Link to={`/${Channel?._id}/${video._id}`} className="video-link">
          <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
          <div className="card-content">
            <div className="channel-avatar">
              <img src={Channel?.logo || "default-logo.png"} alt="Channel Avatar" />
            </div>
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
              <span className="channel-name">{Channel?.name || "Unknown Channel"}</span>
              <div className="video-stats">
                <span>
                  <FaEye /> {video.views || 0} views
                </span>
                <span>
                  <FaThumbsUp /> {video.likes || 0} likes
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className={`video-container ${theaterMode ? "theater-mode" : ""}`}>
      <div className="vid-section">
        <div className="video-player">
          <video 
            ref={videoRef} 
            src={videoUrl || video.url} 
            controls 
            autoPlay 
            onPlay={handleVideoPlay} 
            preload="metadata" 
            style={{ width: "100%" }} 
          />

          {/* Custom Video Controls */}
          <div className="controls">
            <button className="th-m-btn" onClick={handleTheaterMode}>
              {theaterMode ? "Exit Theater" : "Theater Mode"}
            </button>
            <button onClick={handleFocusMode}>
              {focusMode ? "Normal Mode" : "Dim Background"}
            </button>
            <button onClick={() => seekVideo(-10)}>⏪</button>
            <button onClick={() => seekVideo(10)}>⏩</button>
            <select onChange={(e) => handleSpeedChange(parseFloat(e.target.value))} defaultValue="1">
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>
        </div>

        {/* Video Description & Comments */}
        <VideoDescription video={video} />
        <Comments videoId={videoId} />
      </div>

      {/* Recommended Videos Section */}
      <div 
        className={`recommended-videos ${theaterMode ? "thmode": "normalmode"}`} 
        style={{ flexDirection: theaterMode ? "row" : "column" }}
      >
        {recommendedVideos.map((vid) => (
          <VideoPlayerCard key={vid._id} video={vid} />        
        ))}
      </div>
    </div>
  );
}

export default VideoPlayer;
