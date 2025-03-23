import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice"; // Import logout action
import "../styles/Profile.css";

function Profile() {
    const user = useSelector((state) => state.users.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [activeTab, setActiveTab] = useState("videos");

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            fetch(`/api/users/${user._id}`)
                .then((res) => res.json())
                .then((data) => setProfileData(data))
                .catch((err) => console.error("Error fetching profile:", err));
        }
    }, [user, navigate]);

    // Logout Function
    const handleLogout = () => {
        dispatch(logoutUser()); // Clear user from Redux
        localStorage.removeItem("userToken"); // Remove token from local storage
        navigate("/login"); // Redirect to login page
    };

    if (!profileData) return <p>Loading...</p>;

    return (
        <div className="profile-page">
            {/* Banner Section */}
            <div className="profile-banner">
                <img 
                    src={profileData.bannerPic || "default-banner.jpg"} 
                    alt="Banner" 
                />
            </div>

            {/* Profile Info Section */}
            <div className="profile-info">
                <img 
                    src={profileData.profilePic || "dp.png"} 
                    alt="Profile" 
                    className="profile-pic" 
                />
                <div className="profile-details">
                    <h2>{profileData.username}</h2>
                    <p>{profileData.email}</p>
                    <p>{profileData.createdChannels?.length || 0} Channels</p>
                </div>
                <button className="edit-profile-btn">Edit Profile</button>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            {/* Navigation Tabs */}
            <nav className="profile-tabs">
                <button 
                    className={activeTab === "videos" ? "active" : ""}
                    onClick={() => setActiveTab("videos")}
                >
                    Videos
                </button>
                <button 
                    className={activeTab === "playlists" ? "active" : ""}
                    onClick={() => setActiveTab("playlists")}
                >
                    Playlists
                </button>
                <button 
                    className={activeTab === "about" ? "active" : ""}
                    onClick={() => setActiveTab("about")}
                >
                    About
                </button>
            </nav>

            {/* Tab Content */}
            <div className="profile-content">
                {activeTab === "videos" && (
                    <div className="video-grid">
                        {profileData.favoriteVideos.length > 0 ? (
                            profileData.favoriteVideos.map((video) => (
                                <div key={video._id} className="video-card">
                                    <img src={video.thumbnailUrl} alt={video.title} />
                                    <p>{video.title}</p>
                                </div>
                            ))
                        ) : (
                            <p>No videos uploaded yet.</p>
                        )}
                    </div>
                )}

                {activeTab === "playlists" && (
                    <div className="playlist-grid">
                        {profileData.likedVideos.length > 0 ? (
                            profileData.likedVideos.map((video) => (
                                <div key={video._id} className="video-card">
                                    <img src={video.thumbnailUrl} alt={video.title} />
                                    <p>{video.title}</p>
                                </div>
                            ))
                        ) : (
                            <p>No playlists created yet.</p>
                        )}
                    </div>
                )}

                {activeTab === "about" && (
                    <div className="about-section">
                        <p>Email: {profileData.email}</p>
                        <p>Joined: {new Date(profileData.createdAt).toLocaleDateString()}</p>
                        <p>{profileData.comments.length} Comments Made</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
