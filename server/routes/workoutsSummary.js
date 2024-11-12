// routes/workoutSummary.js
import express from 'express';
import BicepsWorkout from './bicepsWorkout.js';
import ChestsWorkout from './chestWorkout.js';
import TricepsWorkout from './tricepsWorkout.js';
import LegsWorkout from './legsWorkout.js';
import ForearmsWorkout from './forearmWorkout.js';

const router = express.Router();

router.get('/workouts-summary', async (req, res) => {
  try {
    const bicepsWorkouts = await BicepsWorkout.find();
    const chestsWorkouts = await ChestsWorkout.find();
    const tricepsWorkouts = await TricepsWorkout.find();
    const legsWorkouts = await LegsWorkout.find();
    const forearmsWorkouts = await ForearmsWorkout.find();

    // Consolidate all the workout data into an object categorized by workout type
    const workoutsSummary = {
      biceps: bicepsWorkouts.map(workout => ({
        exercise: workout.exercise,
        sets: workout.sets,
        reps: workout.reps,
      })),
      chests: chestsWorkouts.map(workout => ({
        exercise: workout.exercise,
        sets: workout.sets,
        reps: workout.reps,
      })),
      triceps: tricepsWorkouts.map(workout => ({
        exercise: workout.exercise,
        sets: workout.sets,
        reps: workout.reps,
      })),
      legs: legsWorkouts.map(workout => ({
        exercise: workout.exercise,
        sets: workout.sets,
        reps: workout.reps,
      })),
      forearms: forearmsWorkouts.map(workout => ({
        exercise: workout.exercise,
        sets: workout.sets,
        reps: workout.reps,
      })),
    };

    res.status(200).json(workoutsSummary);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to fetch workout summaries' });
  }
});

export default router;
