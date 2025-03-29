import React, { useState } from 'react';
import '../styles/Upload.css';
import { useSelector } from 'react-redux';

function Upload() {
    // State management for form fields
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [channelId, setChannelId] = useState('');
    const [videoType, setVideoType] = useState('');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    // Get logged-in user details from Redux store
    const user = useSelector((state) => state.users.user);
    const baseUrl = import.meta.env.VITE_SERVER_URL; // Fetching server URL from environment variables

    // List of predefined video categories
    const videoTypes = [
        'Sci-Fi', 'Adventure', 'Sports', 'Healthcare', 'Anime', 'Cartoon', 
        'Politics', 'News', 'Entertainment', 'Knowledge', 'Gaming', 'Movies', 
        'TV Shows', 'Vlogs', 'Podcasts', 'Tech', 'Music', 'Education', 'Fashion',
        'Lifestyle', 'Fitness', 'Cooking', 'DIY', 'Business', 'Finance', 'Science',
        'Nature', 'History', 'Religion', 'Culture', 'Travel', 'Food', 'Documentary',
        'Comedy', 'Drama', 'Action', 'Fantasy', 'Calm', 'Horror', 'Thriller', 'Romance', 
        'Mystery', 'Biography', 'Crime', 'Western', 'Musical', 'War', 'Supernatural', 
        'Family', 'Animation', 'Superhero', 'Spy'
    ];

    // Validates and sets the uploaded file
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile.type.startsWith('video/')) {
            alert('Please upload a valid video file.');
            return;
        }
        setFile(selectedFile);
    };
    
    // Handles the video upload process
    const handleUpload = async () => {
        // Ensures all required fields are filled before uploading
        if (!file || !title || !description || !channelId || !videoType) {
            return alert('All required fields must be filled!');
        }
    
        setUploading(true);
        setProgress(0);
        
        // Retrieves authentication token and user ID
        const token = sessionStorage.getItem('token');
        const userId = user?._id;
        if (!token || !userId) {
            alert('Authentication error. Please log in.');
            setUploading(false);
            return;
        }
    
        // Preparing the form data to send via POST request
        const formData = new FormData();
        formData.append('video', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('channelId', channelId);
        formData.append('tags', tags);
        formData.append('type', videoType);
        formData.append('uploaderId', userId);
    
        try {
            const response = await fetch(`${baseUrl}/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }, // Sending authentication token
                body: formData,
            });
    
            const data = await response.json();
            if (!data.video) throw new Error('Invalid server response');
    
            alert(`Video uploaded successfully: ${data.video.title}`);
        } catch (error) {
            console.error('Upload failed:', error);
            alert(`Upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };
    
    return (
        <div className="upload-container">
            <h2>Upload Video</h2>

            {/* Input fields for video metadata */}
            <input type="text" placeholder="Title *" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Description *" value={description} onChange={(e) => setDescription(e.target.value)} required />

            {/* File input for video selection */}
            <input className='upload-input' type="file" accept="video/*" onChange={handleFileChange} required />
            
            {/* Channel ID input */}
            <input className='upload-input' type="text" placeholder="Channel ID *" value={channelId} onChange={(e) => setChannelId(e.target.value)} required />

            {/* Tags input for additional metadata */}
            <input className='upload-input' type="text" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
            
            {/* Video Type Dropdown */}
            <select value={videoType} onChange={(e) => setVideoType(e.target.value)} required>
                <option value="">Select Video Type *</option>
                {videoTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>

            {/* Upload button with disabled state during uploading */}
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>

            {/* Progress bar (if any progress is recorded) */}
            {progress > 0 && <progress value={progress} max="100"></progress>}

        </div>
    );
}

export default Upload;
