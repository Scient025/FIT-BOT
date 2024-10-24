import express from 'express';
import registerModel from '../models/register.js';

const router = express.Router();

router.post('/', (req, res) => {
    const { email, password } = req.body;

    registerModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

export default router;
