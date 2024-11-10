import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './routes/contact.js';
import chatbotRoutes from './routes/chatbotRoutes.js'
import registerRoutes from './routes/register.js'
import loginRoutes from './routes/login.js';
import fitnessRoutes from './routes/fitnessRoutes.js';
import backWorkoutRoutes from './routes/backWorkout.js';
import legsWorkoutRoutes from './routes/legsWorkout.js';
import bicepsWorkoutRoutes from './routes/bicepsWorkout.js';
import chestWorkoutRoutes from './routes/chestWorkout.js';
import tricepsWorkoutRoutes from './routes/tricepsWorkout.js';
import shoulderWorkoutRoutes from './routes/shoulderWorkout.js';
import forearmWorkoutRoutes from './routes/forearmWorkout.js';
import communityRoutes from './routes/CommunityRoute.js'
import nutritionRoutes from './routes/nutritionRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .then(() => console.log(`${mongoose.connection.host}`))
    .catch(err => console.log(err));

app.use('/api/fitness', contactRoutes);
app.use('/api/fitness', backWorkoutRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/fitness', legsWorkoutRoutes);
app.use('/api/fitness', bicepsWorkoutRoutes);
app.use('/api/fitness', chestWorkoutRoutes);
app.use('/api/fitness', tricepsWorkoutRoutes);
app.use('/api/fitness', shoulderWorkoutRoutes);
app.use('/api/fitness', forearmWorkoutRoutes);
app.use('/api/community', communityRoutes)
app.use('/api/nutrition', nutritionRoutes);

app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});