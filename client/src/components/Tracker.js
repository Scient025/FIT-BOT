import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tracker.css';

const Tracker = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [foodData, setFoodData] = useState(null); 
    const [loggedFoods, setLoggedFoods] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [mealType, setMealType] = useState('');

    const navigate = useNavigate();

    const getWorkouts = async () => {
        const data = [
            { type: 'Chest', imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80' },
            { type: 'Abs', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
            { type: 'Shoulder', imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80' },
            { type: 'Back', imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
            { type: 'Biceps', imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80' },
            { type: 'Triceps', imageUrl: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
            { type: 'Legs', imageUrl: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
            { type: 'Forearms', imageUrl: 'https://images.unsplash.com/photo-1591940742878-13aba4b7a34e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' }
        ];
        setWorkouts(data);
    };

    useEffect(() => {
        getWorkouts();
    }, []);

    const searchFood = useCallback(async () => {
        if (searchQuery.length > 2) {
            const apiKey = process.env.REACT_APP_USDA_API_KEY; 
            const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchQuery}&api_key=${apiKey}`);
            const data = await response.json();
            if (data.foods && data.foods.length > 0) {
                const firstFood = data.foods[0];
                setFoodData({
                    description: firstFood.description,
                    calories: firstFood.foodNutrients.find(n => n.nutrientName === 'Energy')?.value || 0,
                    protein: firstFood.foodNutrients.find(n => n.nutrientName === 'Protein')?.value || 0,
                    fat: firstFood.foodNutrients.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0,
                });
            } else {
                setFoodData(null);
            }
        }
    }, [searchQuery]);

    useEffect(() => {
        if (searchQuery) searchFood();
    }, [searchQuery, searchFood]);

    const logFood = () => {
        if (foodData && mealType) {
            const currentDate = new Date().toLocaleDateString();
            const foodWithDate = { ...foodData, loggedDate: currentDate, mealType };
            setLoggedFoods([...loggedFoods, foodWithDate]);
            setFoodData(null);
            setMealType(''); 
        }
    };

    const navigateToWorkout = (type) => {
        navigate(`/workout/${type.toLowerCase()}`);
    };

    return (
        <div className="tracker-page">
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search food..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {foodData && (
                <div className="food-info">
                    <h2>{foodData.description}</h2>
                    <form className="food-form">
                        <label>
                            Calories:
                            <input type="text" value={`${foodData.calories} kcal`} readOnly />
                        </label>
                        <label>
                            Protein:
                            <input type="text" value={`${foodData.protein} g`} readOnly />
                        </label>
                        <label>
                            Fat:
                            <input type="text" value={`${foodData.fat} g`} readOnly />
                        </label>
                        <label>
                            Meal Type:
                            <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
                                <option value="">Select Meal</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select>
                        </label>
                        <button type="button" onClick={logFood} disabled={!mealType}>Log This Food</button>
                    </form>
                </div>
            )}

            <h2>Logged Foods</h2>
            <ul>
                {loggedFoods.map((food, index) => (
                    <li key={index}>
                        {food.description}: {food.calories} kcal, {food.protein}g protein, {food.fat}g fat 
                        (Logged on: {food.loggedDate}, Meal: {food.mealType})
                    </li>
                ))}
            </ul>

            <h1 className="main-heading">Workouts</h1>
            <div className="workouts-container">
                {workouts.map((item, index) => (
                    <div
                        className="workout-card"
                        key={index}
                        onClick={() => navigateToWorkout(item.type)}
                    >
                        <div
                            className="workout-card-image"
                            style={{ backgroundImage: `url(${item.imageUrl})` }}
                        ></div>
                        <h2 className="workout-card-title">{item.type}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tracker;
