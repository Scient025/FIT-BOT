import mongoose from 'mongoose';

const foodLogSchema = new mongoose.Schema({
    description: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    fat: { type: Number, required: true },
    loggedDate: { type: String, required: true },
    mealType: { type: String, required: true },
}, { timestamps: true });

const FoodLog = mongoose.model('FoodLog', foodLogSchema);

export default FoodLog;
