// routes/fitnessRoutes.js
import express from 'express';
import Query from '../models/User.js';

const router = express.Router();

// POST route to handle form submissions
router.post('/queries', async (req, res) => {
    try {
        const newQuery = new Query(req.body);
        await newQuery.save();
        res.status(201).json(newQuery);
    } catch (error) {
        res.status(400).json({ error: 'Failed to save query' });
    }
});

export default router;
