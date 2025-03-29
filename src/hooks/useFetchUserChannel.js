import { useState, useEffect } from "react";

const useFetchUserChannel = (userId) => {
  const [userChannel, setUserChannel] = useState(null); // Stores the user's channel data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Stores error messages, if any
  const baseUrl = import.meta.env.VITE_SERVER_URL; // Base URL for API requests

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/channels/user/${userId}`);
        if (!response.ok) {
          if (response.status === 404) {
            console.log("User does not have a channel, kindly create one.");
            setUserChannel(null); // Set to null if no channel exists
            return; // Exit function to prevent error state update
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setUserChannel(data); // Store fetched channel data
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false); // Ensure loading state is false after fetch
      }
    };

    fetchChannel();
  }, [userId]); // Re-fetch when userId changes

  // Function to update video details
  const updateVideo = async (videoId, updatedData) => {
    try {
      const response = await axios.put(`${baseUrl}/api/videos/${videoId}`, updatedData);
      return response.data; // Return updated video data
    } catch (err) {
      setError(err.message);
    }
  };

  return { userChannel, loading, error, updateVideo };
};

export default useFetchUserChannel;
