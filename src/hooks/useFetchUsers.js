import { useState, useEffect } from 'react';

const useFetchUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const baseUrl = 'http://localhost:8000';

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

    const createUser = async (userData) => {
        try {
            const response = await fetch(`${baseUrl}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const newUser = await response.json();
            setUsers((prev) => [...prev, newUser]);
        } catch (err) {
            setError(err.message);
        }
    };

    const updateUser = async (id, updatedData) => {
        try {
            const response = await fetch(`${baseUrl}/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            const updatedUser = await response.json();
            setUsers((prev) => prev.map((u) => (u._id === id ? updatedUser : u)));
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteUser = async (id) => {
        try {
            await fetch(`${baseUrl}/api/users/${id}`, { method: 'DELETE' });
            setUsers((prev) => prev.filter((u) => u._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const favoriteVideo = async (userId, videoId) => {
        try {
            const response = await fetch(`${baseUrl}/api/users/${userId}/favorite/${videoId}`, { method: 'POST' });
            const updatedUser = await response.json();
            setUsers((prev) => prev.map((u) => (u._id === userId ? updatedUser : u)));
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loading, error, createUser, updateUser, deleteUser, favoriteVideo };
};

export default useFetchUsers;
