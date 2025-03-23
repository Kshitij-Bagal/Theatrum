import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Header.css";

function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 460);
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.users.user);

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
        }
    };

    return (
        <header className="header">
            {isMobile && location.pathname === "/search" && (
                <button className="back-button" onClick={() => navigate(-1)}>⬅️</button>
            )}

            <Link to="/" className="logo">🎬 Theatrum</Link>

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
