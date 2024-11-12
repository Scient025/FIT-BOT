import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Community.css';

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({ title: '', content: '', username: '' });
    const [commentData, setCommentData] = useState({});

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/community');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleCommentChange = (e, postId) => {
        setCommentData({ ...commentData, [postId]: { ...commentData[postId], [e.target.id]: e.target.value } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.content || !formData.username) {
            alert('Please fill out all fields.');
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/community', formData);
            fetchPosts();
            setFormData({ title: '', content: '', username: '' });
            toast.success('Post created successfully!');
        } catch (error) {
            console.error('Error creating the post', error);
            toast.error('Failed to create post. Please try again later.');
        }
    };

    const handleCommentSubmit = async (postId) => {
        if (!commentData[postId]?.username || !commentData[postId]?.comment) {
            alert('Please fill out all fields.');
            return;
        }
        try {
            await axios.post(`http://localhost:5000/api/community/${postId}/comment`, commentData[postId]);
            fetchPosts();
            setCommentData({ ...commentData, [postId]: { username: '', comment: '' } });
            toast.success('Comment added successfully!');
        } catch (error) {
            console.error('Error adding comment', error);
            toast.error('Failed to add comment. Please try again later.');
        }
    };

    return (
        <div className="community-page">
            <div className='community-form'>
                <form className="form-container" onSubmit={handleSubmit}>
                    <h2 className="text-center">Create a Community Post</h2>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter your username" onChange={handleChange} value={formData.username} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" className="form-control" id="title" placeholder="Enter the post title" onChange={handleChange} value={formData.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content:</label>
                        <textarea className="form-control" id="content" rows="5" placeholder="Enter your post content" onChange={handleChange} value={formData.content}></textarea>
                    </div>
                    <button type="submit" className="btn btn-dark">Submit</button>
                </form>
                <ToastContainer position="top-right" autoClose={10000} hideProgressBar closeOnClick pauseOnHover draggable />
            </div>
            <div className="posts-list">
                <h2>Community Posts</h2>
                {posts.map((post) => (
                    <div key={post._id} className="post">
                        <h3>{post.title}</h3>
                        <p><strong>{post.username}</strong></p>
                        <p>{post.content}</p>
                        <p><small>{new Date(post.createdAt).toLocaleString()}</small></p>

                        <div className="comments-section">
                            <h4>Comments</h4>
                            <ul>
                                {post.comments.map((comment, index) => (
                                    <li key={index}><strong>{comment.username}</strong>: {comment.comment}</li>
                                ))}
                            </ul>
                            <div className="comment-form">
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Your username"
                                    onChange={(e) => handleCommentChange(e, post._id)}
                                    value={commentData[post._id]?.username || ''}
                                />
                                <textarea
                                    id="comment"
                                    placeholder="Add a comment..."
                                    onChange={(e) => handleCommentChange(e, post._id)}
                                    value={commentData[post._id]?.comment || ''}
                                ></textarea>
                                <button onClick={() => handleCommentSubmit(post._id)} className="btn btn-secondary">Comment</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;
