// routes/fitnessRoutes.js
import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST route to handle form submissions
router.post('/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to save contact' });
    }
});

export default router;
