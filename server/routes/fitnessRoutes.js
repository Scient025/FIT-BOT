import express from 'express';
const router = express.Router();

router.post('/user', (req, res) => {
    res.send('User data received');
});

export default router;
