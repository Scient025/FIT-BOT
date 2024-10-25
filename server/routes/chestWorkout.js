import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const chestsWorkoutSchema = new mongoose.Schema({
    exercise: { type: String, required: true },
    weight: { type: Number, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
}, { timestamps: true });

const ChestsWorkout = mongoose.model('ChestsWorkout', chestsWorkoutSchema);

router.post('/Chests', async (req, res) => {
    try {
        const newWorkout = new ChestsWorkout(req.body);
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to save Chests workout' });
    }
});

export default router;
