import express from 'express';
import Community from '../models/CommunityPage.js'; // Make sure this path is correct

const router = express.Router();

// Create a new community post
router.post('/', async (req, res) => {
    const { title, content, username } = req.body;
    const newPost = new Community({ title, content, username });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error creating post' });
    }
});

// Get all community posts
router.get('/', async (req, res) => {
    try {
        const posts = await Community.find();
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

router.post('/:id/comment', async (req, res) => {
    const { username, comment } = req.body; // Destructure username and comment from request body
    try {
        const updatedPost = await Community.findByIdAndUpdate(
            req.params.id,
            { $push: { comments: { username, comment } } },
            { new: true }
        );
        res.status(200).json(updatedPost); // Return the updated post
    } catch (err) {
        res.status(500).json({ error: 'Error adding comment' }); // Error response
    }
});

export default router;
