import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaThumbsUp } from 'react-icons/fa'; // Import icons
import '../styles/VideoCard.css';

function VideoCard({ video }) {
    if (!video || !video._id || !video.channelId) {
        return <div className="error">Invalid video data</div>;
    }

    // Handle both object and string channelId
    const channelId = typeof video.channelId === 'object' ? video.channelId._id : video.channelId;

    return (
        <div className="video-card">
            <Link to={`/${channelId}/${video._id}`} className="video-link">
                <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
                <div className="card-content">
                    <div className="channel-avatar">
                        <img src={video.channelId.logo || 'default-thumbnail.png'} alt="Channel Avatar" />
                    </div>
                    <div className="video-info">
                        <h3 className="video-title">{video.title}</h3>
                        <span className="channel-name">{video.channelId.name || "Unknown Channel"}</span>
                        <div className="video-stats">
                            <span><FaEye /> {video.views || 0} views</span>
                            <span><FaThumbsUp /> {video.likes || 0} likes</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default VideoCard;
