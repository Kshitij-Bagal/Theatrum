import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/History.css";

function History() {
    const [watchedVideos, setWatchedVideos] = useState([]); // State to store watched videos
    const [searchHistory, setSearchHistory] = useState([]); // State to store search history

    useEffect(() => {
        // Retrieve watched videos and search history from sessionStorage
        setWatchedVideos(JSON.parse(sessionStorage.getItem("watchedVideos")) || []);
        setSearchHistory(JSON.parse(sessionStorage.getItem("searchHistory")) || []);
    }, []);

    return (
        <div className="history-page">
            <h1>History</h1>

            {/* Section for watched videos */}
            <section>
                <h2>Watched Videos</h2>
                {watchedVideos.length > 0 ? (
                    <ul>
                        {watchedVideos.map((video, index) => (
                            <li key={index}>
                                <Link to={`/watch/${video.id}`}>{video.title}</Link> 
                                <span> ({video.timestamp})</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No videos watched yet.</p>
                )}
            </section>

            {/* Section for search history */}
            <section>
                <h2>Search History</h2>
                {searchHistory.length > 0 ? (
                    <ul>
                        {searchHistory.map((search, index) => (
                            <li key={index}>
                                <span>🔍 {search.query}</span> 
                                <span> ({search.timestamp})</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No searches made yet.</p>
                )}
            </section>
        </div>
    );
}

export default History;
