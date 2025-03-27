import { useState, useEffect } from 'react';

const useFetchChannels = () => {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const baseUrl = import.meta.env.VITE_SERVER_URL;

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

    const createChannel = async (channelData) => {
        try {
            const response = await fetch(`${baseUrl}/api/channels`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(channelData),
            });
            const newChannel = await response.json();
            setChannels((prev) => [...prev, newChannel]);
        } catch (err) {
            setError(err.message);
        }
    };

    const updateChannel = async (id, updatedData) => {
        try {
            const response = await fetch(`${baseUrl}/api/channels/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            const updatedChannel = await response.json();
            setChannels((prev) => prev.map((ch) => (ch._id === id ? updatedChannel : ch)));
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteChannel = async (id) => {
        try {
            await fetch(`${baseUrl}/api/channels/${id}`, { method: 'DELETE' });
            setChannels((prev) => prev.filter((ch) => ch._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const subscribeToChannel = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/api/channels/${id}/subscribe`, { method: 'POST' });
            const updatedChannel = await response.json();
            setChannels((prev) => prev.map((ch) => (ch._id === id ? updatedChannel : ch)));
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchChannels();
    }, []);

    return { channels, loading, error, createChannel, updateChannel, deleteChannel, subscribeToChannel };
};

export default useFetchChannels;
