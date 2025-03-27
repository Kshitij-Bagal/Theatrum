import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaYoutube } from 'react-icons/fa'; // Import icons
import { useSelector } from "react-redux";
import "../styles/Header.css";

function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 460);
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.users.user);
    let searchTimeout = null;

    useEffect(() => {
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

    // Function to save search history with debounce
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
                saveSearchHistory(searchQuery); // Save only after delay
            }, 500);
        }

        return () => clearTimeout(searchTimeout);
    }, [searchQuery]);

    return (
        <header className="header">
            {isMobile && location.pathname === "/search" && (
                <button className="back-button" onClick={() => navigate(-1)}>⬅️</button>
            )}

            <Link to="/" className="logo"><FaYoutube /> YouTubeClone</Link>

            {!isMobile ? (
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">🔍</button>
                </form>
            ) : (
                <div className="mobile-search" onClick={() => navigate("/search")}>
                    <button className="search-icon">🔍</button>
                </div>
            )}

            {!isMobile && (
                <div className="header-icons">
                    {user && <Link to="/upload" className="icon-button">⬆️</Link>}
                    {user && <button className="icon-button">🔔</button>}
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
