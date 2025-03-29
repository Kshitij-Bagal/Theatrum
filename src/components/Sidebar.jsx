import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'; // Import hamburger menu icon

import '../styles/Sidebar.css';

function Sidebar({ isMobileOpen, closeSidebar }) {
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 512); // Collapse by default on small screens
    const user = useSelector((state) => state.users.user);
    const userId = user?._id || ''; // Safely access user ID

    useEffect(() => {
        // Function to handle window resizing and adjust sidebar collapse state
        const handleResize = () => {
            setIsCollapsed(window.innerWidth <= 512);
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
    }, []);

    return (
        <div className={`sidebar ${isMobileOpen ? 'open' : isCollapsed ? 'collapsed' : ''}`}>
            {/* Sidebar toggle button */}
            <button 
                className="toggle-btn" 
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <GiHamburgerMenu />
            </button>

            <nav className="nav-links">
                {/* Navigation links */}
                <Link to="/" title="Home" onClick={closeSidebar}>🏠 {isCollapsed ? '' : ' Home'}</Link>
                <Link to={`/user-channel/${userId}`} title="You" onClick={closeSidebar}>📺 {isCollapsed ? '' : ' You'}</Link>
                <Link to="/history" title="History" onClick={closeSidebar}>🕒 {isCollapsed ? '' : ' History'}</Link>
                <Link to="/upload" title="Upload" onClick={closeSidebar}>⬆️ {isCollapsed ? '' : ' Upload'}</Link>
                <Link to="/profile" title="Profile" onClick={closeSidebar}>👤 {isCollapsed ? '' : ' Profile'}</Link>

                {/* Additional sections (only visible when expanded) */}
                <div className={`${isCollapsed ? 'begone' : 'extra-link'}`}>
                    <div className="divider" />
                    <p className='nav-header'>{isCollapsed ? '' : ' Explore'}</p>
                    <span className="disabled">🔥 {isCollapsed ? '' : ' Trending'}</span>
                    <span className="disabled">🛒 {isCollapsed ? '' : ' Shopping'}</span>
                    <span className="disabled">🎵 {isCollapsed ? '' : ' Music'}</span>
                    <span className="disabled">🎥 {isCollapsed ? '' : ' Movies'}</span>
                    <span className="disabled">📺 {isCollapsed ? '' : ' Live'}</span>
                </div>

                <div className={`${isCollapsed ? 'begone' : 'extra-link'}`}>
                    <div className="divider" />
                    <p className="nav-header">{isCollapsed ? '' : ' More from YouTubeClone'}</p>
                    <span className="disabled">🎬 {isCollapsed ? '' : ' YouTubeClone Studio'}</span>
                    <span className="disabled">🎶 {isCollapsed ? '' : ' YouTubeClone Music'}</span>
                </div>

                {/* Bottom section: Settings, Help, Feedback */}
                <div className="divider" />
                <span className="disabled">⚙️ {isCollapsed ? '' : ' Settings'}</span>
                <span className="disabled">❓ {isCollapsed ? '' : ' Help'}</span>
                <span className="disabled">📢 {isCollapsed ? '' : ' Send Feedback'}</span>
            </nav>
        </div>
    );
}

export default Sidebar;
