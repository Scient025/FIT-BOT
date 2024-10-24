import express from 'express';
import Tracker from '../models/Tracker.js'; // Importing the Tracker model

const router = express.Router();

// POST route for specific tracker types
router.post('/Tracker/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const newTracker = new Tracker({ ...req.body, type });
        await newTracker.save();
        console.log(`${type} tracker saved:`, newTracker);
        res.status(201).json(newTracker);
    } catch (error) {
        console.error(`Failed to save ${req.params.type} tracker:`, error);
        res.status(400).json({ error: `Failed to save ${req.params.type} tracker` });
    }
});

// GET route to retrieve all trackers
router.get('/Tracker', async (req, res) => {
    try {
        const trackers = await Tracker.find();
        res.status(200).json(trackers);
    } catch (error) {
        console.error('Failed to retrieve trackers:', error);
        res.status(500).json({ error: 'Failed to retrieve trackers' });
    }
});

export default router;
