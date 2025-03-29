import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa'; // Import eye icon for views display
import '../styles/VideoCard.css';

function VideoCard({ video, channel }) {
    // Ensure the video object has necessary data before rendering
    if (!video || !video._id || !video.channelId) {
        return <div className="error">Invalid video data</div>;
    }

    // Handle both object and string cases for channelId
    const channelId = typeof video.channelId === 'object' ? video.channelId._id : video.channelId;
    const chlogo = channel?.logo || video.channelId?.logo || 'default-logo.png'; // Fallback to default logo if missing
    const chname = channel?.name || video.channelId?.name || 'Unknown Channel'; // Fallback to "Unknown Channel"

    // Function to calculate time difference in human-readable format (e.g., "3 days ago")
    const getTimeAgo = (uploadDate) => {
        const uploaded = new Date(uploadDate);
        const now = new Date();
        const diffInSeconds = Math.floor((now - uploaded) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
        };

        for (const [unit, seconds] of Object.entries(intervals)) {
            const interval = Math.floor(diffInSeconds / seconds);
            if (interval >= 1) {
                return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
            }
        }
        return "Just now";
    };

    return (
        <div className="video-card">
            {/* Clickable video link */}
            <Link to={`/${channelId}/${video._id}`} className="video-link">
                {/* Video thumbnail */}
                <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />

                <div className="card-content">
                    {/* Channel logo */}
                    <div className="channel-avatar">
                        <img src={chlogo} alt="Channel Avatar" />
                    </div>

                    {/* Video details */}
                    <div className="video-info">
                        <h3 className="video-title">{video.title}</h3>
                        <span className="channel-name">{chname}</span>
                        <div className="video-stats">
                            {/* Display view count with an eye icon */}
                            <span>{video.views || 0} <FaEye /></span>
                            {/* Show time since upload */}
                            <span>{getTimeAgo(video.uploadDate)}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default VideoCard;
