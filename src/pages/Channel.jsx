import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { subscribeChannel } from '../redux/channelSlice';
import '../styles/Channel.css';

function Channel() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/channels/${id}`);
                setChannel(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching channel data');
                setLoading(false);
            }
        };

        fetchChannel();
    }, [id]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!channel) {
        return <h2>Channel not found</h2>;
    }

    return (
        <div className="channel">
            <div className="channel-banner">
                <img
                    src={channel.banner}
                    alt={`${channel.name} Banner`}
                    className="banner-image"
                />
            </div>

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
                <button
                    className="subscribe-btn"
                    onClick={() => dispatch(subscribeChannel(channel.id))}
                >
                    Subscribe
                </button>
                </div>
            </div>

            <div className="channel-description">
                <h2>About this channel</h2>
                <p>{channel.description}</p>
            </div>

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
