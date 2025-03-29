import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { subscribeChannel } from '../redux/channelSlice';
import '../styles/Channel.css';

function Channel() {
    const { id } = useParams(); // Extract channel ID from URL parameters
    const dispatch = useDispatch(); // Initialize Redux dispatch function
    const [channel, setChannel] = useState(null); // State to store channel data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to store error messages
    const baseUrl = import.meta.env.VITE_SERVER_URL; // Base API URL from environment variables

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                // Fetch channel data from API
                const response = await axios.get(`${baseUrl}/api/channels/${id}`);
                setChannel(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching channel data');
                setLoading(false);
            }
        };

        fetchChannel();
    }, [id]); // Re-run effect when `id` changes

    if (loading) {
        return <h2>Loading...</h2>; // Show loading text while data is being fetched
    }

    if (error) {
        return <h2>{error}</h2>; // Display error message if API call fails
    }

    if (!channel) {
        return <h2>Channel not found</h2>; // Handle case when channel data is empty
    }

    return (
        <div className="channel">
            {/* Display channel banner image */}
            <div className="channel-banner">
                <img
                    src={channel.banner}
                    alt={`${channel.name} Banner`}
                    className="banner-image"
                />
            </div>

            {/* Channel header with logo, name, subscribers, and subscribe button */}
            <div className="channel-header">
                <img
                    src={channel.logo}
                    alt={`${channel.name} Logo`}
                    className="channel-logo"
                />
                <div className="channel-info">
                    <h1>{channel.name}</h1>
                    <p>{channel.subscribers.toLocaleString()} Subscribers</p>
                    <p>{channel.videos.length} Videos</p>
                    {/* Dispatch Redux action to subscribe to the channel */}
                    <button
                        className="subscribe-btn"
                        onClick={() => dispatch(subscribeChannel(channel.id))}
                    >
                        Subscribe
                    </button>
                </div>
            </div>

            {/* Section for channel description */}
            <div className="channel-description">
                <h2>About this channel</h2>
                <p>{channel.description}</p>
            </div>

            {/* Display videos uploaded by the channel */}
            <div className="channel-videos">
                <h2>Videos</h2>
                <div className="video-list">
                    {channel.videos.map((video) => (
                        <div className="video-card" key={video._id || video.id}>
                            <Link to={`/${video.channelId}/${video._id || video.id}`}>
                                <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
                                <h3>{video.title}</h3>
                                <p>
                                    {video.views.toLocaleString()} views ·{' '}
                                    {new Date(video.uploadDate).toDateString()}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Channel;
