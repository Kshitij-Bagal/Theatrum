import { useState, useEffect } from 'react';

const useFetchChannels = () => {
    const [channels, setChannels] = useState([]); // Store channel data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const baseUrl = import.meta.env.VITE_SERVER_URL; // Base URL from environment variables

    // Fetch all channels from the server
    const fetchChannels = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/api/channels`);
            const data = await response.json();
            setChannels(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Create a new channel and update the state
    const createChannel = async (channelData) => {
        try {
            const response = await fetch(`${baseUrl}/api/channels`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(channelData),
            });
            const newChannel = await response.json();
            setChannels((prev) => [...prev, newChannel]); // Append new channel
        } catch (err) {
            setError(err.message);
        }
    };

    // Update an existing channel
    const updateChannel = async (id, updatedData) => {
        try {
            const response = await fetch(`${baseUrl}/api/channels/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            const updatedChannel = await response.json();
            setChannels((prev) => prev.map((ch) => (ch._id === id ? updatedChannel : ch))); // Replace updated channel
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete a channel
    const deleteChannel = async (id) => {
        try {
            await fetch(`${baseUrl}/api/channels/${id}`, { method: 'DELETE' });
            setChannels((prev) => prev.filter((ch) => ch._id !== id)); // Remove deleted channel
        } catch (err) {
            setError(err.message);
        }
    };

    // Subscribe to a channel
    const subscribeToChannel = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/api/channels/${id}/subscribe`, { method: 'POST' });
            const updatedChannel = await response.json();
            setChannels((prev) => prev.map((ch) => (ch._id === id ? updatedChannel : ch))); // Update channel subscribers
        } catch (err) {
            setError(err.message);
        }
    };

    // Fetch channels when the component mounts
    useEffect(() => {
        fetchChannels();
    }, []);

    return { channels, loading, error, createChannel, updateChannel, deleteChannel, subscribeToChannel };
};

export default useFetchChannels;
