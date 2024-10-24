import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './routes/contact.js';
import chatbotRoutes from './routes/chatbotRoutes.js'
import registerRoutes from './routes/register.js'
import loginRoutes from './routes/login.js';
import fitnessRoutes from './routes/fitnessRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .then(() => console.log(`${mongoose.connection.host}`))
    .catch(err => console.log(err));

app.use('/api/fitness', fitnessRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/contact', contactRoutes);


app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
