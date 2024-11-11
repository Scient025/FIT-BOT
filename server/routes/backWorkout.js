import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const backWorkoutSchema = new mongoose.Schema({
    weight: { type: Number, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
}, { timestamps: true });

const BackWorkout = mongoose.model('BackWorkout', backWorkoutSchema);

router.post('/back', async (req, res) => {
    try {
        const newWorkout = new BackWorkout(req.body);
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to save back workout' });
    }
});

router.get('/back', async (req, res) => {
    try {
        const workouts = await BackWorkout.find(); 
        res.status(200).json(workouts);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to fetch back workouts' });
    }
});

export default router;
