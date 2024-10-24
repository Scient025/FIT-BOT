import express from 'express';
import registerModel from '../models/register.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newUser = await registerModel.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
