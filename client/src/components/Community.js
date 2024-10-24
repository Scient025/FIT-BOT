// src/CommunityPage.js
import React, { useState, useEffect } from 'react';
import './Community.css';

const CommunityPage = () => {
    const [posts, setPosts] = useState([]);
    const [postFormData, setPostFormData] = useState({ title: '', content: '', username: '' });
    const [commentFormData, setCommentFormData] = useState({ postId: '', comment: '', username: '' });
    const [isCreatingPost, setIsCreatingPost] = useState(false);

    useEffect(() => {
        // Initial posts
        const initialPosts = [
            {
                _id: '1',
                title: 'The Journey to Fitness',
                content: 'The habits you develop reflect your identity and your aspirations for the future. Achieving a great physique isn\'t about shortcuts; it\'s about the effort you put in. Embrace the journey and commit to the process—it truly makes all the difference.',
                username: 'FITTR',
                comments: [
                    { username: 'arham', comment: 'wow' },
                    { username: 'sara', comment: 'appreciable' }
                ]
            },
            {
                _id: '2',
                title: 'Race Across India',
                content: '2nd edition of Race Across India, Asia\'s longest-ever cycle race from Kashmir to Kanyakumari. K2K. Taking cue from the sayings of our Hon’ble Prime Minister Modi ji who asked people to give priority to sports and fitness-related activities, saying it will.',
                username: 'IndianOilSponsor',
                comments: [
                    { username: 'arham', comment: 'amazing' }
                ]
            },
            {
                _id: '3',
                title: 'Health First Gym',
                content: 'Started our health related fitness unit today. We discussed the 5 components of personal fitness & how we will be sorting our activities by which fitness component each activity works on using our interactive bulletin board. Today’s activity worked on cardiovascular fitness!',
                username: 'Health First Gym',
                comments: [
                    { username: 'arham', comment: 'excited to see this' }
                ]
            }
        ];

        setPosts(initialPosts);
    }, []);

    const handlePostChange = (e) => {
        setPostFormData({ ...postFormData, [e.target.name]: e.target.value });
    };

    const handleCommentChange = (e) => {
        setCommentFormData({ ...commentFormData, [e.target.name]: e.target.value });
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        // Create new post
        try {
            const newPost = { ...postFormData, comments: [] };
            setPosts([...posts, newPost]); // Update local state with new post
            setPostFormData({ title: '', content: '', username: '' });
            setIsCreatingPost(false); // Close the post creation form
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleCommentSubmit = async (e, postId) => {
        e.preventDefault();
        // Create comment for the post
        try {
            const updatedPosts = posts.map(post => {
                if (post._id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, { username: commentFormData.username, comment: commentFormData.comment }]
                    };
                }
                return post;
            });
            setPosts(updatedPosts);
            setCommentFormData({ postId: '', comment: '', username: '' });
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="community-page">
            <h2>Fitness Community Feed</h2>

            <button onClick={() => setIsCreatingPost(!isCreatingPost)}>
                {isCreatingPost ? 'Cancel' : 'Create Post'}
            </button>

            {isCreatingPost && (
                <form onSubmit={handlePostSubmit} className="post-form">
                    <input
                        type="text"
                        name="title"
                        placeholder="Post Title"
                        value={postFormData.title}
                        onChange={handlePostChange}
                        required
                    />
                    <textarea
                        name="content"
                        placeholder="Post Content"
                        value={postFormData.content}
                        onChange={handlePostChange}
                        required
                    ></textarea>
                    <input
                        type="text"
                        name="username"
                        placeholder="Your Name"
                        value={postFormData.username}
                        onChange={handlePostChange}
                        required
                    />
                    <button type="submit">Submit Post</button>
                </form>
            )}

            <div className="posts-container">
                {posts.map((post) => (
                    <div key={post._id} className="post">
                        <h3>{post.title}</h3>
                        <p><strong>{post.username}</strong></p>
                        <p>{post.content}</p>
                        <div className="comments-section">
                            <h4>Comments:</h4>
                            <ul>
                                {post.comments && post.comments.length > 0 ? (
                                    post.comments.map((comment, index) => (
                                        <li key={index}><strong>{comment.username}:</strong> {comment.comment}</li>
                                    ))
                                ) : (
                                    <p>No comments yet.</p>
                                )}
                            </ul>
                            <form onSubmit={(e) => handleCommentSubmit(e, post._id)}>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Your Name"
                                    value={commentFormData.username}
                                    onChange={handleCommentChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="comment"
                                    placeholder="Your Comment"
                                    value={commentFormData.comment}
                                    onChange={handleCommentChange}
                                    required
                                />
                                <button type="submit">Add Comment</button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityPage;
