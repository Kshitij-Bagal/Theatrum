import React, { useEffect, useState } from 'react';
import VideoList from '../components/VideoList.jsx';
import useFetchVideos from '../hooks/useFetchVideos';
import { Link } from 'react-router-dom';
import '../styles/Home.css';    

function Home() {
    const { videos, loading, error, fetchVideos } = useFetchVideos();
    const [videoTypes, setVideoTypes] = useState([]);
    const baseUrl = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        fetchVideos();
        fetchVideoTypes();
    }, []);

    const fetchVideoTypes = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/videos/get/types`); // ✅ Updated URL
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setVideoTypes(data);
            } else {
                setVideoTypes([]); // Fallback if data isn't an array
            }
        } catch (err) {
            console.error('Error fetching video types:', err);
            setVideoTypes([]); // Ensure it's always an array
        }
    };
    
    
    return (
        <div className="home">
            {/* Populate video types dynamically */}
            <div className="video_types">
                {videoTypes.map((type, index) => (
                    <Link key={index} to={`/browse/${encodeURIComponent(type)}`} className="video-type">
                        {type}
                    </Link>
                ))}
            </div>

            {loading && <p>Loading videos...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && <VideoList videos={videos} />}
        </div>
    );
}

export default Home;
