import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const legsWorkoutSchema = new mongoose.Schema({
    weight: { type: Number, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
}, { timestamps: true });

const LegsWorkout = mongoose.model('LegsWorkout', legsWorkoutSchema);

router.post('/legs', async (req, res) => {
    try {
        const newWorkout = new LegsWorkout(req.body);
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to save legs workout' });
    }
});

router.get('/legs', async (req, res) => {
    try {
        const workouts = await LegsWorkout.find(); 
        res.status(200).json(workouts);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to fetch legs workouts' });
    }
});

export default router;
