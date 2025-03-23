import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ isMobileOpen, closeSidebar }) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const user = useSelector((state) => state.users.user) || '';    
    const userId = user._id || '';

    useEffect(() => {
        if (window.innerWidth <= 512) {
            setIsCollapsed(true); // Ensure it's collapsed on mobile
        }
    }, []);

    return (
        <div className={`sidebar ${isMobileOpen ? 'open' : isCollapsed ? 'collapsed' : ''}`}>
            <button 
                className="toggle-btn" 
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {isCollapsed ? '➡️' : '⬅️'}
            </button>

            <nav className="nav-links">
                <Link to="/" title="Home" onClick={closeSidebar}>🏠 {isCollapsed ? '' : 'Home'}</Link>
                <Link to="/browse" title="Browse" onClick={closeSidebar}>🔍 {isCollapsed ? '' : 'Browse'}</Link>
                <Link to={`/user-channel/${userId}`} title="Channel" onClick={closeSidebar}>📺 {isCollapsed ? '' : 'Channel'}</Link>
                <Link to="/library" title="Library" onClick={closeSidebar}>📚 {isCollapsed ? '' : 'Library'}</Link>
                <Link to="/history" title="History" onClick={closeSidebar}>🕒 {isCollapsed ? '' : 'History'}</Link>
                <Link to="/upload" title="Upload" onClick={closeSidebar}>⬆️ {isCollapsed ? '' : 'Upload'}</Link>
                <Link to="/profile" title="Profile" onClick={closeSidebar}>👤 {isCollapsed ? '' : 'Profile'}</Link>
            </nav>
        </div>
    );
}

export default Sidebar;
