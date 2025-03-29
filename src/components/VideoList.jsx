import React from 'react';
import VideoCard from './VideoCard.jsx';
import '../styles/VideoList.css';

function VideoList({ videos }) {
    return (
        <div className="video-list">
            {/* Check if there are videos to display */}
            {videos.length > 0 ? (
                videos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                ))
            ) : (
                <p>No videos found. Try uploading some!</p>
            )}
        </div>
    );
}

export default VideoList;
