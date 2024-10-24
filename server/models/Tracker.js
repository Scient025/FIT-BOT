import mongoose from 'mongoose';

const trackerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true }, // assuming duration is in minutes
}, { timestamps: true });

const Tracker = mongoose.model('Tracker', trackerSchema);

export default Tracker;