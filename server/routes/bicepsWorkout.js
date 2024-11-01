import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const bicepsWorkoutSchema = new mongoose.Schema({
    exercise: { type: String, required: true },
    weight: { type: Number, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
}, { timestamps: true });

const BicepsWorkout = mongoose.model('BicepsWorkout', bicepsWorkoutSchema);

router.post('/Biceps', async (req, res) => {
    try {
        const newWorkout = new BicepsWorkout(req.body);
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to save Biceps workout' });
    }
});

export default router;
