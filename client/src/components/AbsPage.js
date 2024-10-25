import React, { useState } from 'react';
import axios from 'axios';

const AbsPage = () => {
    const [workoutInput, setWorkoutInput] = useState({
        weight: '',
        sets: '',
        reps: '',
        caloriesBurned: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWorkoutInput({
            ...workoutInput,
            [name]: value,
        });
    };

    const submitWorkout = async (e) => {
        e.preventDefault();
        if (!workoutInput.weight || !workoutInput.sets || !workoutInput.reps || !workoutInput.caloriesBurned) {
            alert('Please fill out all fields.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/fitness/abs', workoutInput);
            console.log('Server response:', response.data);
            alert('Abs workout saved successfully!');
            setWorkoutInput({ weight: '', sets: '', reps: '', caloriesBurned: '' });
        } catch (error) {
            console.error('Error saving workout:', error);
            alert(`Failed to save workout: ${error.response?.data?.error || error.message}`);
        }
    };
    
    return (
        <div>
            <h1>Abs Workout</h1>
            <form onSubmit={submitWorkout}>
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight"
                    value={workoutInput.weight}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="sets"
                    placeholder="Sets"
                    value={workoutInput.sets}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="reps"
                    placeholder="Reps"
                    value={workoutInput.reps}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="caloriesBurned"
                    placeholder="Calories Burned"
                    value={workoutInput.caloriesBurned}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit Workout</button>
            </form>
        </div>
    );
};

export default AbsPage;
