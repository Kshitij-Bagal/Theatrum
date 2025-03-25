import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoList from '../components/VideoList.jsx';
import '../styles/Browse.css';

function Browse() {
    const { type } = useParams(); // Get video type from URL
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideosByType = async () => {
            try {
                const response = await fetch(`https://theatrum-server.onrender.com/api/videos/types/${encodeURIComponent(type)}`);
                const data = await response.json();

                if (response.ok) {
                    setVideos(data);
                } else {
                    setError(data.message || 'Failed to load videos');
                }
            } catch (err) {
                setError('Error fetching videos');
            } finally {
                setLoading(false);
            }
        };

        fetchVideosByType();
    }, [type]);

    return (
        <div className="browse">
            <h1>Browse: {type}</h1>
            {loading && <p>Loading videos...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && <VideoList videos={videos} />}
        </div>
    );
}

export default Browse;
