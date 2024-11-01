import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import registerModel from '../models/register.js';

const router = express.Router();

// POST request to login a user
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await registerModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
