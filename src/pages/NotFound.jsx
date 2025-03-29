import React from 'react';
import '../styles/NotFound.css';

function NotFound() {
    return (
        <div className="not-found">
            <h1>404</h1> {/* Display the error code */}
            <p>Oops! The page you’re looking for doesn’t exist.</p> {/* Informative message */}
        </div>
    );
}

export default NotFound;
