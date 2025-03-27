import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEye, FaThumbsUp } from "react-icons/fa"; // Import icons
import "../styles/Browse.css";

function Browse() {
    const { type } = useParams(); // Get video type from URL
    const [videos, setVideos] = useState([]);
    const [channelData, setChannelData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        const fetchVideosByType = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${baseUrl}/api/videos/types/${encodeURIComponent(type)}`);
                const data = await response.json();

                if (!response.ok) throw new Error(data.message || "Failed to load videos");

                setVideos(data);

                // Extract unique channel IDs
                const uniqueChannelIds = [...new Set(data.map(video => video.channelId))];

                // Fetch all channel details in parallel
                if (uniqueChannelIds.length) fetchAllChannels(uniqueChannelIds);
            } catch (err) {
                setError(err.message || "Error fetching videos");
            } finally {
                setLoading(false);
            }
        };

        fetchVideosByType();
    }, [type]);

    const fetchAllChannels = async (channelIds) => {
        try {
            const responses = await Promise.all(
                channelIds.map(id => fetch(`${baseUrl}/api/channels/${id}`).then(res => res.json()))
            );

            // Store all channel data in an object { channelId: channelData }
            const newChannelData = channelIds.reduce((acc, id, index) => {
                acc[id] = responses[index];
                return acc;
            }, {});

            setChannelData(prev => ({ ...prev, ...newChannelData }));
        } catch (err) {
            console.error("Error fetching channels:", err);
        }
    };

    // Video Card Component
    const VideoPlayerCard = ({ video }) => {
        const channel = channelData[video.channelId] || {}; // Get channel details

        return (
            <div className="video-card">
                <Link to={`/${video.channelId}/${video._id}`} className="video-link">
                    <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
                    <div className="card-content">
                        <div className="channel-avatar">
                            <img src={channel.logo || "default-logo.png"} alt="Channel Avatar" />
                        </div>
                        <div className="video-info">
                            <h3 className="video-title">{video.title}</h3>
                            <span className="channel-name">{channel.name || "Unknown Channel"}</span>
                            <div className="video-stats">
                                <span><FaEye /> {video.views || 0} views</span>
                                <span><FaThumbsUp /> {video.likes || 0} likes</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    };

    return (
        <div className="browse">
            <h1>Browse: {type}</h1>
            {loading && <p>Loading videos...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && videos.length === 0 && <p>No videos found.</p>}
            <div className="video-grid">
                {videos.map(video => (
                    <VideoPlayerCard key={video._id} video={video} />
                ))}
            </div>
        </div>
    );
}

export default Browse;
