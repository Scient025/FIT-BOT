import express from 'express';
import fetch from 'node-fetch';
import Message from '../models/ChatbotMsgs.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const router = express.Router();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(403).json({ message: 'Invalid token' });
    }
};

router.post('/sendMessage', verifyToken, async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }],
            }),
        });

        const data = await response.json();
        const botResponse = data.candidates[0].content.parts[0].text;

        const newMessage = new Message({
            userMessage: message,
            botMessage: botResponse,
            userId: req.user.id,
        });

        await newMessage.save();

        res.json({ reply: botResponse });
    } catch (error) {
        console.error('Error with chatbot:', error);
        res.status(500).json({ message: 'Something went wrong with the chatbot.' });
    }
});

export default router;
