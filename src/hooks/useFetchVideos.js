import { useState, useEffect } from 'react';

const useFetchVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const baseUrl = 'http://localhost:8000';

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/api/videos`);
            const data = await response.json();
            setVideos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createVideo = async (videoData) => {
        try {
            const response = await fetch(`${baseUrl}/api/videos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(videoData),
            });
            const newVideo = await response.json();
            setVideos((prev) => [...prev, newVideo]);
        } catch (err) {
            setError(err.message);
        }
    };

    const updateVideo = async (id, updatedData) => {
        try {
            const response = await fetch(`${baseUrl}/api/videos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            const updatedVideo = await response.json();
            setVideos((prev) => prev.map((v) => (v._id === id ? updatedVideo : v)));
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteVideo = async (id) => {
        try {
            await fetch(`${baseUrl}/api/videos/${id}`, { method: 'DELETE' });
            setVideos((prev) => prev.filter((v) => v._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const likeVideo = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/api/videos/${id}/like`, { method: 'POST' });
            const updatedVideo = await response.json();
            setVideos((prev) => prev.map((v) => (v._id === id ? updatedVideo : v)));
        } catch (err) {
            setError(err.message);
        }
    };

    const addComment = async (id, comment) => {
        try {
            const response = await fetch(`${baseUrl}/api/videos/${id}/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment),
            });
            const updatedVideo = await response.json();
            setVideos((prev) => prev.map((v) => (v._id === id ? updatedVideo : v)));
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return { videos, loading, error, fetchVideos, createVideo, updateVideo, deleteVideo, likeVideo, addComment };
};

export default useFetchVideos;
