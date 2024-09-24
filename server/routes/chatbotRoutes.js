import express from 'express';
import fetch from 'node-fetch';
import Message from '../models/ChatbotMsgs.js';  // Mongoose model for saving chat history
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Chatbot API interaction and storing chat history
router.post('/sendMessage', async (req, res) => {
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
