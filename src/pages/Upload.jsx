import React, { useState } from 'react';
import '../styles/Upload.css';
import { useSelector } from 'react-redux';

function Upload() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [channelId, setChannelId] = useState('');
    const [videoType, setVideoType] = useState('');
    const [uploading, setUploading] = useState(false);
    const user = useSelector((state) => state.users.user);

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

    const [progress, setProgress] = useState(0);

    // File validation
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile.type.startsWith('video/')) {
            alert('Please upload a valid video file.');
            return;
        }
        setFile(selectedFile);
    };
    
    const handleUpload = async () => {
        if (!file || !title || !description || !channelId || !videoType) {
            return alert('All required fields must be filled!');
        }
    
        setUploading(true);
        setProgress(0);
        
        const token = sessionStorage.getItem('token');
        const userId = user?._id;
        if (!token || !userId) {
            alert('Authentication error. Please log in.');
            setUploading(false);
            return;
        }
    
        const formData = new FormData();
        formData.append('video', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('channelId', channelId);
        formData.append('tags', tags);
        formData.append('type', videoType);
        formData.append('uploaderId', userId);
    
        try {
            const response = await fetch('https://theatrum-server.onrender.com/upload', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
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
            <input type="text" placeholder="Title *" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Description *" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input className='upload-input' type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} required />
            <input className='upload-input' type="text" placeholder="Channel ID *" value={channelId} onChange={(e) => setChannelId(e.target.value)} required />
            <input className='upload-input' type="text" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
            
            {/* Video Type Dropdown */}
            <select value={videoType} onChange={(e) => setVideoType(e.target.value)} required>
                <option value="">Select Video Type *</option>
                {videoTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>

            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {progress > 0 && <progress value={progress} max="100"></progress>}

        </div>
    );
}

export default Upload;
