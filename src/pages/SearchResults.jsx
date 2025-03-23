import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/SearchResults.css'

function SearchResults() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q") || "";
    const baseUrl = 'http://localhost:8000';

    const [videos, setVideos] = useState([]);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        if (!query) return;

        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/search?q=${query}`);
                const data = await response.json();
                setVideos(data.videos);
                setChannels(data.channels);
            } catch (error) {
                console.error("Search fetch error:", error);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="search-results">
            <h2>Search Results for "{query}"</h2>

            {videos.length > 0 && (
                <div>
                    <h3>Videos</h3>
                    <ul>
                        {videos.map((video) => (
                            <li key={video._id}>
                                <Link to={`/${video.channelId}/${video._id}`}>
                                    <img src={video.thumbnailUrl} alt={video.title} />
                                    <div>
                                        <h3>{video.title}</h3>
                                        <p>{video.channelName}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {channels.length > 0 && (
                <div>
                    <h3>Channels</h3>
                    <ul>
                        {channels.map((channel) => (
                            <li key={channel._id}>
                                <Link to={`/channel/${channel._id}`}>
                                    <img src={channel.logo} alt={channel.name} />
                                    <div>
                                        <h3>{channel.name}</h3>
                                        <p>{channel.subscribers} subscribers</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {videos.length === 0 && channels.length === 0 && <p>No results found.</p>}
        </div>
    );
}

export default SearchResults;
