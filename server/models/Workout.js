import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
    type: { type: String, required: true },
    weight: { type: Number, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    bodyPart: { type: String },         
    skillLevel: { type: String },        
    equipment: { type: String },        
    workoutType: { type: String },       
    duration: { type: Number },       
    imageUrl: { type: String },        
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
