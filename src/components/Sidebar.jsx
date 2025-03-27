import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'; // Import icons

import '../styles/Sidebar.css';

function Sidebar({ isMobileOpen, closeSidebar }) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const user = useSelector((state) => state.users.user) || '';    
    const userId = user._id || '';

    useEffect(() => {
        if (window.innerWidth <= 512) {
            setIsCollapsed(true);
        }
    }, []);

    return (
        <div className={`sidebar ${isMobileOpen ? 'open' : isCollapsed ? 'collapsed' : ''}`}>
            <button 
                className="toggle-btn" 
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {isCollapsed ? <GiHamburgerMenu /> : <GiHamburgerMenu />}
            </button>

            <nav className="nav-links">
                <Link to="/" title="Home" onClick={closeSidebar}>🏠   {isCollapsed ? '' : '    Home'}</Link>
                <Link to={`/user-channel/${userId}`} title="You" onClick={closeSidebar}>📺   {isCollapsed ? '' : '   You'}</Link>
                <Link to="/history" title="History" onClick={closeSidebar}>🕒   {isCollapsed ? '' : '   History'}</Link>
                <Link to="/upload" title="Upload" onClick={closeSidebar}>⬆️   {isCollapsed ? '' : '    Upload'}</Link>
                <Link to="/profile" title="Profile" onClick={closeSidebar}>👤   {isCollapsed ? '' : '    Profile'}</Link>

                {/* Non-functional placeholders */}
                <div className={` ${isCollapsed ? 'begone' : 'extra-link '}`}>
                    <div className="divider" />
                    <p className='nav-header'>{isCollapsed ? '' : '    Explore'}</p>
                    <span className="disabled">🔥 {isCollapsed ? '' : '    Trending'}</span>
                    <span className="disabled">🛒 {isCollapsed ? '' : '    Shopping'}</span>
                    <span className="disabled">🎵 {isCollapsed ? '' : 'Music'}</span>
                    <span className="disabled">🎥 {isCollapsed ? '' : 'Movies'}</span>
                    <span className="disabled">📺 {isCollapsed ? '' : 'Live'}</span>
                </div>
                <div className={` ${isCollapsed ? 'begone' : 'extra-link '}`}>
                    <div className="divider" />
                    <p className="nav-header">{isCollapsed ? '' : 'More from YouTubeClone'}</p>
                    <span className="disabled">🎬 {isCollapsed ? '' : 'YouTubeClone Studio'}</span>
                    <span className="disabled">🎶 {isCollapsed ? '' : 'YouTubeClone Music'}</span>
                </div>
                <div className="divider" />
                {/* <Link to="/settings" title="Settings" onClick={closeSidebar}> {isCollapsed ? '' : 'Settings'}</Link> */}
                <span className="disabled">⚙️ {isCollapsed ? '' : 'Settings'}</span>
                <span className="disabled">❓ {isCollapsed ? '' : 'Help'}</span>
                <span className="disabled">📢 {isCollapsed ? '' : 'Send Feedback'}</span>
            </nav>
        </div>
    );
}

export default Sidebar;
