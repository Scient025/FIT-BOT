import express from 'express';
import Community from '../models/CommunityPage.js'; 

const router = express.Router();

// Create a new community post
router.post('/Community', async (req, res) => {
    const { title, content, username } = req.body;
    const newPost = new Community({ title, content, username });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ error: 'Error creating post' });
    }
});

// Get all community posts
router.get('/Community', async (req, res) => {
    try {
        const posts = await Community.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

// Update a community post
router.put('/Community/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        const updatedPost = await Community.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }  // Returns the updated post
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: 'Error updating post' });
    }
});

// Delete a community post
router.delete('/Community/:id', async (req, res) => {
    try {
        await Community.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting post' });
    }
});

export default router;
