import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaYoutube } from 'react-icons/fa'; // Import icons
import { useSelector } from "react-redux";
import "../styles/Header.css";

function Header() {
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [isMobile, setIsMobile] = useState(window.innerWidth < 460); // State to track mobile view
    const [isSearchExpanded, setIsSearchExpanded] = useState(false); // State to toggle search bar in mobile view
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.users.user);
    let searchTimeout = null; // Timeout reference for debouncing search history

    useEffect(() => {
        // Function to update isMobile state when window resizes
        const handleResize = () => {
            setIsMobile(window.innerWidth < 460);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`);
            saveSearchHistory(searchQuery);
        }
    };

    const toggleSearch = () => {
        setIsSearchExpanded((prev) => !prev); // Toggle search bar visibility in mobile view
    };

    // Function to save search history with a limit of 10 items
    const saveSearchHistory = (query) => {
        if (!query.trim()) return;

        const searchHistory = JSON.parse(sessionStorage.getItem("searchHistory")) || [];
        if (searchHistory.length > 0 && searchHistory[0].query === query) return; // Avoid consecutive duplicates

        const newHistory = [{ query, timestamp: new Date().toLocaleString() }, ...searchHistory];
        sessionStorage.setItem("searchHistory", JSON.stringify(newHistory.slice(0, 10))); // Keep max 10 items
    };

    // Debounce search history saving (User must stop typing for 500ms)
    useEffect(() => {
        if (searchTimeout) clearTimeout(searchTimeout);

        if (searchQuery.trim()) {
            searchTimeout = setTimeout(() => {
                saveSearchHistory(searchQuery);
            }, 500);
        }

        return () => clearTimeout(searchTimeout);
    }, [searchQuery]);

    return (
        <header className="header">
            {/* Back button for search page in mobile view */}
            {isMobile && location.pathname === "/search" && (
                <button className="back-button" onClick={() => navigate(-1)}>⬅️</button>
            )}

            <Link to="/" className="logo"><FaYoutube /> YouTube</Link>

            {/* Search bar: Adjusted for mobile and desktop views */}
            {isMobile ? (
                <div className={`mobile-search ${isSearchExpanded ? "expanded" : ""}`}>
                    <button className="search-icon" onClick={toggleSearch}>🔍</button>
                    {isSearchExpanded && (
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => setIsSearchExpanded(false)} // Collapse search bar when losing focus
                            autoFocus
                        />
                    )}
                </div>
            ) : (
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">🔍</button>
                </form>
            )}

            {/* Header icons and user profile (hidden in mobile view) */}
            {!isMobile && (
                <div className="header-icons">
                    {user && <Link to="/upload" className="icon-button">⬆️</Link>} {/* Upload button */}
                    {user && <button className="icon-button">🔔</button>} {/* Notifications button */}

                    {/* User profile: Display either profile image or initials */}
                    {user ? (
                        <div className="profile-icon" onClick={() => navigate("/profile")}>
                            {user.profileImg ? (
                                <img src={user.profileImg} alt="Profile" className="profile-img" />
                            ) : (
                                <div className="profile-initials">
                                    {user.username[0].toUpperCase()}
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="login-btn">Sign In</Link>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;
