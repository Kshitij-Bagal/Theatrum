import React, { useEffect, useState } from 'react';
import VideoList from '../components/VideoList.jsx';
import useFetchVideos from '../hooks/useFetchVideos';
import { Link } from 'react-router-dom';
import '../styles/Home.css';    

function Home() {
    const { videos, loading, error, fetchVideos } = useFetchVideos();
    const [videoTypes, setVideoTypes] = useState([]); // Stores video categories
    const [typesLoading, setTypesLoading] = useState(true); // Loading state for categories
    const baseUrl = import.meta.env.VITE_SERVER_URL; // API Base URL from environment variables

    useEffect(() => {
        if (baseUrl) { // Ensure baseUrl is available before making API requests
            fetchVideos();
            fetchVideoTypes();
        }
    }, [baseUrl]); // Runs only when `baseUrl` changes

    // Function to fetch video categories from API
    const fetchVideoTypes = async () => {
        try {
            setTypesLoading(true); // Set loading state before fetching
            const response = await fetch(`${baseUrl}/api/videos/get/types`);

            if (!response.ok) throw new Error('Failed to fetch video types'); // Handle HTTP errors

            const data = await response.json();
            setVideoTypes(Array.isArray(data) ? data : []); // Ensure `data` is always an array
        } catch (err) {
            console.error('Error fetching video types:', err);
            setVideoTypes([]); // Fallback to an empty array on error
        } finally {
            setTypesLoading(false); // Stop loading state
        }
    };

    return (
        <div className="home">
            {/* Video Types Navigation */}
            <div className="video_types">
                {typesLoading ? (
                    <p>Loading categories...</p>
                ) : videoTypes.length > 0 ? (
                    videoTypes.map((type, index) => (
                        <Link key={index} to={`/browse/${encodeURIComponent(type)}`} className="video-type">
                            {type}
                        </Link>
                    ))
                ) : (
                    <p>No categories found.</p>
                )}
            </div>

            {/* Video List */}
            {loading && <p>Loading videos...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && <VideoList videos={videos} />}
        </div>
    );
}

export default Home;
