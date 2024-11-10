import express from 'express';
import FoodLog from '../models/FoodLog.js';

const router = express.Router();

router.get('/loggedFoods', async (req, res) => {
    try {
        const loggedFoods = await FoodLog.find().sort({ createdAt: -1 });
        res.status(200).json(loggedFoods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve logged foods' });
    }
});

router.post('/loggedFoods', async (req, res) => {
    try {
        const newFoodLog = new FoodLog(req.body);
        await newFoodLog.save();
        res.status(201).json(newFoodLog);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to save food log' });
    }
});

export default router;
