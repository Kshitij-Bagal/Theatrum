import { useState, useEffect } from 'react';

const useFetchUsers = () => {
    const [users, setUsers] = useState([]); // Stores the list of users
    const [loading, setLoading] = useState(false); // Tracks loading state
    const [error, setError] = useState(null); // Stores error messages, if any
    const baseUrl = import.meta.env.VITE_SERVER_URL; // Base URL for API requests

    // Function to fetch all users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/api/users`);
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to create a new user
    const createUser = async (userData) => {
        try {
            const response = await fetch(`${baseUrl}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const newUser = await response.json();
            setUsers((prev) => [...prev, newUser]); // Add new user to state
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to update an existing user
    const updateUser = async (id, updatedData) => {
        try {
            const response = await fetch(`${baseUrl}/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            const updatedUser = await response.json();
            setUsers((prev) => prev.map((u) => (u._id === id ? updatedUser : u))); // Update the user in state
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to delete a user
    const deleteUser = async (id) => {
        try {
            await fetch(`${baseUrl}/api/users/${id}`, { method: 'DELETE' });
            setUsers((prev) => prev.filter((u) => u._id !== id)); // Remove deleted user from state
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to mark a video as a favorite for a user
    const favoriteVideo = async (userId, videoId) => {
        try {
            const response = await fetch(`${baseUrl}/api/users/${userId}/favorite/${videoId}`, { method: 'POST' });
            const updatedUser = await response.json();
            setUsers((prev) => prev.map((u) => (u._id === userId ? updatedUser : u))); // Update user data with favorite video
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch users on component mount
    }, []);

    return { users, loading, error, createUser, updateUser, deleteUser, favoriteVideo };
};

export default useFetchUsers;
