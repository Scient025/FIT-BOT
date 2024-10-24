import express from 'express';
import fetch from 'node-fetch';
import Message from '../models/ChatbotMsgs.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer header
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // Proceed if valid
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Chatbot API interaction and storing chat history
router.post('/sendMessage', verifyToken, async (req, res) => {
    const { message } = req.body;

    try {
        // OpenAI API call
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: message },
                ],
            }),
        });

        const data = await response.json();
        const botResponse = data.choices[0].message.content;

        // Save the conversation in MongoDB
        const newMessage = new Message({
            userMessage: message,
            botMessage: botResponse,
            userId: req.user.id, // Save user ID from JWT payload
        });

        await newMessage.save();

        // Respond to the frontend
        res.json({ reply: botResponse });
    } catch (error) {
        console.error('Error with chatbot:', error);
        res.status(500).json({ message: 'Something went wrong with the chatbot.' });
    }
});

export default router;
