import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import registerModel from '../models/register.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await registerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = await registerModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;

//generated a random 32-byte hex string to encrypt the password:
//node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"