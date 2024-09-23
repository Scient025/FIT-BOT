import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fitnessRoutes from './routes/fitnessRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/fitness', fitnessRoutes);
app.use('/api/chatbot', chatbotRoutes); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
