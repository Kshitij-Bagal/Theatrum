import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import VideoCard from "../components/VideoCard.jsx";
import Comments from "../components/Comments.jsx";
import VideoDescription from "../components/VideoDescription.jsx";
import "../styles/VideoPlayer.css";
import { fetchChannels } from "../redux/channelSlice";

function VideoPlayer() {
  const dispatch = useDispatch();
  const { channelId, videoId } = useParams();
  const videoRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [theaterMode, setTheaterMode] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  const channel = useSelector((state) =>
    state.channel?.channels?.find((ch) => String(ch._id) === channelId)
  );

  const video = channel?.videos?.find((vid) => String(vid._id) === videoId);
  const recommendedVideos = channel?.videos?.filter((vid) => vid._id !== videoId);

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

  const seekVideo = (seconds) => {
    if (videoRef.current) videoRef.current.currentTime += seconds;
  };

  const handleTheaterMode = () => {
    setTheaterMode((prev) => !prev);
    document.documentElement.classList.toggle("theater-active");
  };

  const handleFocusMode = () => {
    setFocusMode((prev) => !prev);
    document.body.classList.toggle("focus-mode-active", !focusMode);
  };

  const handleSpeedChange = (speed) => {
    if (videoRef.current) videoRef.current.playbackRate = speed;
  };

  if (!channel) return <div>Channel not found</div>;
  if (!video) return <div>Video not found</div>;
  // console.log("Video Data:", video);
  // console.log("Channel Data:", video.channelId);
  
  const videoUrl = `http://localhost:8000/stream-video/${video._id}.mp4`;

  return (
    <div className={`video-container ${theaterMode ? "theater-mode" : ""}`}>
      <div className="vid-section">
        <div className="video-player">
          <video ref={videoRef} src={videoUrl} controls autoPlay preload="metadata" style={{ width: "100%" }} />

          {/* Controls */}
          <div className="controls">
            <button className="th-m-btn" onClick={handleTheaterMode}>{theaterMode ? "Exit Theater" : "Theater Mode"}</button>
            <button onClick={handleFocusMode}>{focusMode ? "Normal Mode" : "Dim Background"}</button>
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

        <VideoDescription video={video} />
        <Comments videoId={videoId} />
      </div>

      {/* Recommended Videos */}
      <div className="recommended-videos" style={{ flexDirection: theaterMode ? "row" : "column" }}>
      {recommendedVideos.map((vid) => {
        console.log("Video Data:", vid);
        // console.log("Channel Data:", vid.channelId);
        
          return <VideoCard key={vid._id} video={vid} />
        })}
      </div>
    </div>
  );
}

export default VideoPlayer;
