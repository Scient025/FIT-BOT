import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/Tracker/:type', async (req, res) => {
    const { type } = req.params; 
    const { weight, sets, reps, caloriesBurned } = req.body;
    console.log(`Request to save ${type} workout:`, req.body);
    try {
        if (mongoose.models[type]) {
            delete mongoose.models[type];
        }

        const dynamicCollection = mongoose.model(type, new mongoose.Schema({
            type: { type: String, required: true },
            weight: { type: Number, required: true },
            sets: { type: Number, required: true },
            reps: { type: Number, required: true },
            caloriesBurned: { type: Number, required: true },
        }), type);

        const newWorkout = new dynamicCollection({
            type,
            weight,
            sets,
            reps,
            caloriesBurned
        });

        await newWorkout.save();

        console.log(`${type} workout saved:`, newWorkout);
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error(`Failed to save ${type} workout:`, error);
        res.status(400).json({ error: `Failed to save ${type} workout` });
    }
});


export default router;
