// nutritionRoutes.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
const router = express.Router();

// Replace with your external API endpoint
const CALORIE_API_URL = 'https://api.spoonacular.com/food/products/search';
const API_KEY = process.env.CALORIE_API_KEY; // Store your API key in .env

// Endpoint to get caloric data for a list of food items
router.post('/nutrition', async (req, res) => {
    const { foodItems } = req.body; // Assume foodItems is an array of item names
    try {
        const responses = await Promise.all(
            foodItems.map(item =>
                axios.get(`${CALORIE_API_URL}?query=${item}&apiKey=${API_KEY}`)
            )
        );
        const nutritionData = responses.map(response => response.data);
        res.status(200).json({ nutritionData });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching caloric data', error });
    }
});

export default router;
