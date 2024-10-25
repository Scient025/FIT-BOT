// routes/tracker.js
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// POST route to save workout in dynamic collections based on type
router.post('/Tracker/:type', async (req, res) => {
    const { type } = req.params; // Extract the workout type (e.g., Back, Chest, etc.)
    const { weight, sets, reps, caloriesBurned } = req.body;
    console.log(`Request to save ${type} workout:`, req.body);
    try {
        // Check if the model already exists in mongoose's model cache and delete it if so
        if (mongoose.models[type]) {
            delete mongoose.models[type];
        }

        // Dynamically define a collection based on the workout type
        const dynamicCollection = mongoose.model(type, new mongoose.Schema({
            type: { type: String, required: true },
            weight: { type: Number, required: true },
            sets: { type: Number, required: true },
            reps: { type: Number, required: true },
            caloriesBurned: { type: Number, required: true },
        }), type);

        // Create a new document and save it to the corresponding workout collection
        const newWorkout = new dynamicCollection({
            type,
            weight,
            sets,
            reps,
            caloriesBurned
        });

        await newWorkout.save(); // Save the workout to the corresponding collection

        console.log(`${type} workout saved:`, newWorkout);
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error(`Failed to save ${type} workout:`, error);
        res.status(400).json({ error: `Failed to save ${type} workout` });
    }
});


export default router;
