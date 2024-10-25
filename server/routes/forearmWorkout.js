import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const forearmsWorkoutSchema = new mongoose.Schema({
    exercise: { type: String, required: true },
    weight: { type: Number, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
}, { timestamps: true });

const ForearmsWorkout = mongoose.model('ForearmsWorkout', forearmsWorkoutSchema);

router.post('/Forarms', async (req, res) => {
    try {
        const newWorkout = new ForearmsWorkout(req.body);
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to save Forearms workout' });
    }
});

export default router;
