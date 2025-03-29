import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/SearchResults.css'

function SearchResults() {
    const location = useLocation(); // Get current URL location
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q") || ""; // Extract the search query from URL
    const baseUrl = import.meta.env.VITE_SERVER_URL; // Base server URL from environment variables

    const [videos, setVideos] = useState([]); // State to store search result videos
    const [channels, setChannels] = useState([]); // State to store search result channels

    useEffect(() => {
        if (!query) return; // If no query is present, do not fetch results

        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/search?q=${query}`);
                const data = await response.json();
                setVideos(data.videos); // Store fetched videos in state
                setChannels(data.channels); // Store fetched channels in state
            } catch (error) {
                console.error("Search fetch error:", error);
            }
        };

        fetchSearchResults();
    }, [query]); // Fetch results whenever the query changes

    return (
        <div className="search-results">
            <h2>Search Results for "{query}"</h2>

            {/* Display videos if any are found */}
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

            {/* Display channels if any are found */}
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

            {/* Show message if no results are found */}
            {videos.length === 0 && channels.length === 0 && <p>No results found.</p>}
        </div>
    );
}

export default SearchResults;
