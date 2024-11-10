import express from 'express';
import Workout from '../models/Workout.js';

const router = express.Router();

// GET /api/recommender - Fetch recommended workouts based on filters
router.get('/', async (req, res) => {
    const { bodyPart, skillLevel, equipment, workoutType } = req.query;

    const filter = {};
    if (bodyPart) filter.bodyPart = bodyPart;
    if (skillLevel) filter.skillLevel = skillLevel;
    if (equipment) filter.equipment = equipment;
    if (workoutType) filter.workoutType = workoutType;

    try {
        const workouts = await Workout.find(filter);
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workouts', error });
    }
});

export default router;
