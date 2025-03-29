import React, { useState, useEffect } from 'react';
import '../styles/Comments.css'
import { useSelector } from 'react-redux';

function Comment({ comment, onReply, onLike, onDislike }) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleReplySubmit = () => {
        if (replyText.trim()) {
            onReply(comment._id, replyText);
            setReplyText('');
            setShowReplyForm(false);
        }
    };

    return (
        <div className="comment">
            <div className="comment-content">
                <p>{comment.text}</p>
                <div className="comment-actions">
                    <button onClick={() => onLike(comment._id)}>👍 {comment.likes}</button>
                    <button onClick={() => onDislike(comment._id)}>👎 {comment.dislikes}</button>
                    <button onClick={() => setShowReplyForm(!showReplyForm)}>💬 Reply</button>
                </div>
                {showReplyForm && (
                    <div className="reply-form">
                        <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." />
                        <button onClick={handleReplySubmit}>Reply</button>
                    </div>
                )}
            </div>
            {comment.replies && comment.replies.length > 0 && (
                <div className="replies">
                    {comment.replies.map((reply) => (
                        <Comment key={reply._id} comment={reply} onReply={onReply} onLike={onLike} onDislike={onDislike} />
                    ))}
                </div>
            )}
        </div>
    );
}

function Comments({ videoId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const user = useSelector((state) => state.users.user);
    const userId = user?._id;
    const username = user?.username;
    const baseUrl = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        if (!videoId) return; // Prevent fetching if videoId is not available
    
        fetch(`${baseUrl}/api/videos/${videoId}/comments`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then((data) => setComments(data))
            .catch((err) => console.error("Error fetching comments:", err));
    }, [videoId]); // Fetch comments when videoId changes

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await fetch(`${baseUrl}/api/videos/${videoId}/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, username, text: newComment })
            });

            const updatedComments = await response.json();
            setComments(updatedComments);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleReply = async (commentId, replyText) => {
        try {
            const response = await fetch(`${baseUrl}/api/videos/${videoId}/comment/${commentId}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, username, text: replyText })
            });

            if (!response.ok) throw new Error('Failed to add reply');

            // Fetch updated comments from the server instead of manually modifying state
            const updatedComments = await fetch(`${baseUrl}/api/videos/${videoId}/comments`)
                .then(res => res.json());

            setComments(updatedComments); // Update state with new comments
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    const handleLike = async (commentId) => {
        try {
            await fetch(`${baseUrl}/api/videos/${videoId}/comment/${commentId}/like`, { method: 'POST' });

            // Optimistically update the comment likes without waiting for the server response
            setComments((prev) => prev.map((c) => (c._id === commentId ? { ...c, likes: c.likes + 1 } : c)));
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };

    const handleDislike = async (commentId) => {
        try {
            await fetch(`${baseUrl}/api/videos/${videoId}/comment/${commentId}/dislike`, { method: 'POST' });

            // Optimistically update the comment dislikes without waiting for the server response
            setComments((prev) => prev.map((c) => (c._id === commentId ? { ...c, dislikes: c.dislikes + 1 } : c)));
        } catch (error) {
            console.error('Error disliking comment:', error);
        }
    };

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            <div className="add-comment">
                <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." />
                <button onClick={handleAddComment}>Post</button>
            </div>
            <div className="comments-list">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} onReply={handleReply} onLike={handleLike} onDislike={handleDislike} />
                    ))
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
}

export default Comments;
