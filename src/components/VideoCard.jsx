import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa'; // Import icons
import '../styles/VideoCard.css';

function VideoCard({ video, channel }) {
    if (!video || !video._id || !video.channelId) {
        return <div className="error">Invalid video data</div>;
    }

    // Handle both object and string channelId
    const channelId = typeof video.channelId === 'object' ? video.channelId._id : video.channelId;
    const chlogo = channel?.logo || video.channelId.logo;
    const chname = channel?.name || video.channelId.name;

    // Function to calculate time difference (e.g., "3 days ago", "2 weeks ago")
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
            <Link to={`/${channelId}/${video._id}`} className="video-link">
                <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
                <div className="card-content">
                    <div className="channel-avatar">
                        <img src={chlogo || 'default-logo.png'} alt="Channel Avatar" />
                    </div>
                    <div className="video-info">
                        <h3 className="video-title">{video.title}</h3>
                        <span className="channel-name">{chname || 'Unknown Channel'}</span>
                        <div className="video-stats">
                            <span>{video.views || 0} <FaEye /></span>
                            <span>{getTimeAgo(video.uploadDate)}</span> {/* Show time ago */}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default VideoCard;
