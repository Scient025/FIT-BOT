import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Tracker.css';

const Tracker = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [workouts, setWorkouts] = useState(null);
    const [exerciseInput, setExerciseInput] = useState({
        type: '',
        weight: '',
        sets: '',
        reps: '',
        caloriesBurned: '',
    });
    const [foodItems, setFoodItems] = useState([{ name: '', nutrition: null }]); // Array of objects
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExerciseInput({
            ...exerciseInput,
            [name]: value,
        });
    };

    const handleFoodItemChange = async (index, value) => {
        const updatedItems = [...foodItems];
        updatedItems[index].name = value;
        setFoodItems(updatedItems);

        if (value) {
            try {
                const response = await axios.post('http://localhost:5000/api/nutrition', { foodItems: [value] });
                const nutrition = response.data.nutritionData[0];
                updatedItems[index].nutrition = nutrition;
                setFoodItems(updatedItems);
            } catch (error) {
                console.error('Error fetching nutrition data:', error);
            }
        }
    };

    const handleAddFoodItem = () => {
        setFoodItems([...foodItems, { name: '', nutrition: null }]);
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
                    placeholder="Search workouts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <h1 className="main-heading">Workouts</h1>
            <div className="workouts-container">
                {workouts && workouts
                    .filter((item) => item.type.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((item) => (
                        <div
                            className="workout-card"
                            key={item.type}
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

            {/* Nutrition Tracker */}
            <h1 className="main-heading">Nutrition Tracker</h1>
            <div className="nutrition-tracker">
                {foodItems.map((item, index) => (
                    <div key={index} className="nutrition-item">
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleFoodItemChange(index, e.target.value)}
                            placeholder="Enter food item"
                            className="nutrition-input"
                        />
                        {item.nutrition && (
                            <div className="nutrition-data">
                                <p>Calories: {item.nutrition.calories}</p>
                                <p>Protein: {item.nutrition.protein}g</p>
                                <p>Fat: {item.nutrition.fat}g</p>
                                <p>Carbs: {item.nutrition.carbs}g</p>
                            </div>
                        )}
                    </div>
                ))}
                <button onClick={handleAddFoodItem}>Add Food Item</button>
            </div>
        </div>
    );
};

export default Tracker;
