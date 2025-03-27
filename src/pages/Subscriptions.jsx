import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const user = useSelector((state) => state.users.user);
    const baseUrl = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        if (!user) return;

        const fetchSubscriptions = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/subscriptions?userId=${user._id}`);
                const data = await response.json();
                setSubscriptions(data);
            } catch (error) {
                console.error('Failed to fetch subscriptions:', error);
            }
        };

        fetchSubscriptions();
    }, [user]);

    return (
        <div className="subscriptions">
            <h1>Your Subscriptions</h1>
            {subscriptions.length > 0 ? (
                <ul>
                    {subscriptions.map(channel => (
                        <li key={channel._id}>
                            <img src={channel.logo} alt={channel.name} />
                            <span>{channel.name}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You are not subscribed to any channels yet.</p>
            )}
        </div>
    );
}

export default Subscriptions;
