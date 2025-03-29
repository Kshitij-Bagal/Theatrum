import { React, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/VideoDescription.css';

function VideoDescription() {
    const { videoId } = useParams();
    
    // Fetch the logged-in user from Redux state
    const user = useSelector((state) => state.users.user);

    // Find the video in Redux store by searching across all channels
    const video = useSelector((state) =>
        state.channel?.channels
            ?.flatMap((channel) => channel.videos) // Merge all videos into a single array
            ?.find((v) => String(v._id) === videoId) // Find the video with the matching ID
    );

    // Fetch the base server URL from environment variables
    const baseUrl = import.meta.env.VITE_SERVER_URL;

    // Find the corresponding channel for the video
    const channel = useSelector((state) =>
        state.channel?.channels?.find((c) => c._id === video?.channelId)
    );

    // Handle cases where video or channel data is missing
    if (!video) return <h2>Video not found in description</h2>;
    if (!channel) return <h2>Channel not found in description</h2>;

    // State to update video details dynamically
    const [videoData, setVideoData] = useState(video);

    // Handle subscription button click
    const handleSubscription = () => {
        alert(`You have Subscribed To ${channel.title}`);
    };

    // Function to handle like/dislike actions
    const handleLikeDislike = async (type) => {
        try {
            const response = await fetch(`${baseUrl}/api/videos/${videoId}/${type}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id }) // Send user ID in request body
            });
            const updatedVideo = await response.json();
            setVideoData(updatedVideo); // Update state with new like/dislike count
        } catch (error) {
            console.error(`Error updating ${type}:`, error);
        }
    };

    return (
        <div className="video-description">
            <h2 className="video-description-title">{video.title}</h2>

            <div className="disc-header">
                {/* Channel details section */}
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
                    <button onClick={handleSubscription} className="subscribe-btn">Subscribe</button>
                </div>

                {/* Video action buttons */}
                <div className="video-actions">
                    <div className="like-dislike">
                        {/* Like and Dislike buttons with dynamic counts */}
                        <button className='like-btn' onClick={() => handleLikeDislike('like')}>
                            👍 {videoData.likedBy?.length || 0}
                        </button>
                        <button className='dislike-btn' onClick={() => handleLikeDislike('dislike')}>
                            👎 {videoData.dislikedBy?.length || 0}
                        </button>
                    </div>
                    <button>🔗 Share</button>
                    <button>⬇️ Download</button>
                </div>            
            </div>

            {/* Video statistics (views, upload date, tags) */}
            <div className="video-stats">
                <span>{video.views.toLocaleString()} views</span>
                <span>{new Date(video.uploadDate).toDateString()}</span>
                <span>#{video.tags?.join(' #')}</span>
            </div>

            {/* Video description and external links */}
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
