import {React, useState}  from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import  '../styles/VideoDescription.css'

function VideoDescription() {
    const { videoId } = useParams();
    // Fetch video and channel data from Redux state
    const user = useSelector((state) => state.users.user);
    const video = useSelector((state) =>
        state.channel?.channels
            ?.flatMap((channel) => channel.videos)
            ?.find((v) => String(v._id) === videoId)
    );

    const channel = useSelector((state) =>
        state.channel?.channels?.find((c) => c._id === video?.channelId)
    );

    if (!video) return <h2>Video not found in description</h2>;
    if (!channel) return <h2>Channel not found in description</h2>;
    const [videoData, setVideoData] = useState(video);

    // Function to handle like/dislike
    const handleLikeDislike = async (type) => {
        try {
            const response = await fetch(`https://theatrum-server.onrender.com/api/videos/${videoId}/${type}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id })  // Replace with actual user ID
            });
            const updatedVideo = await response.json();
            setVideoData(updatedVideo); // Update state immediately
        } catch (error) {
            console.error(`Error updating ${type}:`, error);
        }
    };

    return (
        <div className="video-description">
            <h2 className="video-description-title">{video.title}</h2>

            <div className="uploader-info">
                <div className="channel-details">
                    <img src={channel.logo} alt={`${channel.name} Logo`} className="channel-logo" />
                    <div className="channel-meta">
                        <Link to={`/channel/${channel._id}`}>
                            <h3 className="channel-name">{channel.name}</h3>
                        </Link>
                        <span className="subscribers">{channel.subscribers.toLocaleString()} subscribers</span>
                    </div>
                </div>
                <button className="subscribe-btn">Subscribe</button>
            </div>

            <div className="video-stats">
                <span>{video.views.toLocaleString()} views</span>
                <span>{new Date(video.uploadDate).toDateString()}</span>
                <span>#{video.tags?.join(' #')}</span>
            </div>

            <div className="video-actions">
                <button onClick={() => handleLikeDislike('like')}>
                 👍 {videoData.likedBy?.length || 0}
                </button>
                <button onClick={() => handleLikeDislike('dislike')}>
                    👎 {videoData.dislikedBy?.length || 0}
                </button>
                <button>🔗 Share</button>
                <button>⬇️ Download</button>
            </div>

            <div className="video-description-text">
                <p>{video.description}</p>
                <div className="video-links">
                    {video.links?.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VideoDescription;
