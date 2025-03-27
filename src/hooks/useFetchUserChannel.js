import { useState, useEffect } from "react";

const useFetchUserChannel = (userId) => {
  const [userChannel, setUserChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/channels/user/${userId}`);
        if (!response.ok) {
          if (response.status === 404) {
            console.log('user does not have channel kindly create one')
            setUserChannel(null); // No channel, show form
            return; // Exit to avoid setting error state
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setUserChannel(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [userId]);

  const updateVideo = async (videoId, updatedData) => {
    try {
      const response = await axios.put(`${baseUrl}/api/videos/${videoId}`, updatedData);
      return response.data;
    } catch (err) {
      setError(err.message);
    }
  };

  return { userChannel, loading, error, updateVideo };
};

export default useFetchUserChannel;