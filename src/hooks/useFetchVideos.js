import { useState, useEffect } from 'react';

const useFetchVideos = () => {
    const [videos, setVideos] = useState([]); // Stores the list of videos
    const [loading, setLoading] = useState(false); // Tracks loading state
    const [error, setError] = useState(null); // Stores any errors that occur
    const baseUrl = import.meta.env.VITE_SERVER_URL; // Base API URL from environment variables

    // Fetches all videos from the server
    const fetchVideos = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/api/videos`);
            const data = await response.json();
            setVideos(data); // Update state with fetched videos
        } catch (err) {
            setError(err.message); // Store error message if request fails
        } finally {
            setLoading(false);
        }
    };

    // Creates a new video entry
    const createVideo = async (videoData) => {
        try {
            const response = await fetch(`${baseUrl}/api/videos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(videoData),
            });
            const newVideo = await response.json();
            setVideos((prev) => [...prev, newVideo]); // Add new video to the list
        } catch (err) {
            setError(err.message);
        }
    };

    // Updates an existing video's details
    const updateVideo = async (id, updatedData) => {
        try {
            const response = await fetch(`${baseUrl}/api/videos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            const updatedVideo = await response.json();
            setVideos((prev) => prev.map((v) => (v._id === id ? updatedVideo : v))); // Replace the updated video in state
        } catch (err) {
            setError(err.message);
        }
    };

    // Deletes a video by ID
    const deleteVideo = async (id) => {
        try {
            await fetch(`${baseUrl}/api/videos/${id}`, { method: 'DELETE' });
            setVideos((prev) => prev.filter((v) => v._id !== id)); // Remove the deleted video from state
        } catch (err) {
            setError(err.message);
        }
    };

    // Sends a like request for a video
    const likeVideo = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/api/videos/${id}/like`, { method: 'POST' });
            const updatedVideo = await response.json();
            setVideos((prev) => prev.map((v) => (v._id === id ? updatedVideo : v))); // Update the video with new like count
        } catch (err) {
            setError(err.message);
        }
    };

    // Adds a comment to a video
    const addComment = async (id, comment) => {
        try {
            const response = await fetch(`${baseUrl}/api/videos/${id}/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment),
            });
            const updatedVideo = await response.json();
            setVideos((prev) => prev.map((v) => (v._id === id ? updatedVideo : v))); // Update the video with new comment
        } catch (err) {
            setError(err.message);
        }
    };

    // Fetch videos on component mount
    useEffect(() => {
        fetchVideos();
    }, []);

    return { videos, loading, error, fetchVideos, createVideo, updateVideo, deleteVideo, likeVideo, addComment };
};

export default useFetchVideos;
