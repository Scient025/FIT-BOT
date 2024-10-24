import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import registerModel from '../models/register.js';

const router = express.Router();

// POST request to register a new user
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await registerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcryptjs.hash(password, 10); // 10 rounds of hashing

        // Create new user with hashed password
        const newUser = await registerModel.create({
            name,
            email,
            password: hashedPassword, // Store the hashed password
        });

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;

//node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"