import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
    type: { type: String, required: true },
    weight: { type: Number, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    bodyPart: { type: String },          // New field
    skillLevel: { type: String },         // New field
    equipment: { type: String },          // New field
    workoutType: { type: String },        // New field
    duration: { type: Number },           // New field
    imageUrl: { type: String },           // New field for workout image
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
