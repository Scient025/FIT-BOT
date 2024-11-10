import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
const router = express.Router();

const CALORIE_API_URL = 'https://api.spoonacular.com/food/products/search';
const API_KEY = process.env.CALORIE_API_KEY;

router.post('/nutrition', async (req, res) => {
    const { foodItems } = req.body; 
    try {
        const responses = await Promise.all(
            foodItems.map(item =>
                axios.get(`${CALORIE_API_URL}?query=${item}&apiKey=${API_KEY}`)
            )
        );
        const nutritionData = responses.map(response => response.data);
        res.status(200).json({ nutritionData });
    } catch (error) {
        console.error('Error fetching caloric data:', error); 
        res.status(500).json({ message: 'Error fetching caloric data', error });
    }
});

export default router;
