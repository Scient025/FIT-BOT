import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const tricepsWorkoutSchema = new mongoose.Schema({
    exercise: { type: String, required: true },
    weight: { type: Number, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
}, { timestamps: true });

const TricepsWorkout = mongoose.model('TricepsWorkout', tricepsWorkoutSchema);

router.post('/Triceps', async (req, res) => {
    try {
        const newWorkout = new TricepsWorkout(req.body);
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to save Triceps workout' });
    }
});

router.get('/Triceps', async (req, res) => {
    try {
        const workouts = await TricepsWorkout.find(); 
        res.status(200).json(workouts);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to fetch triceps workouts' });
    }
});

export default router;
