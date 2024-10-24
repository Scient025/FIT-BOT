import React, { useState } from 'react';

const ChestPage = () => {
    const [workoutInput, setWorkoutInput] = useState({
        workout: 'Chest',
        weight: '',
        reps: '',
        sets: '',
        caloriesBurned: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWorkoutInput({
            ...workoutInput,
            [name]: value
        });
    };

    const submitWorkout = () => {
        console.log('Workout Data:', workoutInput);
        alert('Workout data submitted!');
    };

    return (
        <div>
            <h1>Chest Workout</h1>

            <div className="workout-inputs">
                <label>
                    Weight:
                    <input
                        type="number"
                        name="weight"
                        value={workoutInput.weight}
                        onChange={handleInputChange}
                        placeholder="Enter weight used"
                    />
                </label>
                <label>
                    Reps:
                    <input
                        type="number"
                        name="reps"
                        value={workoutInput.reps}
                        onChange={handleInputChange}
                        placeholder="Enter number of reps"
                    />
                </label>
                <label>
                    Sets:
                    <input
                        type="number"
                        name="sets"
                        value={workoutInput.sets}
                        onChange={handleInputChange}
                        placeholder="Enter number of sets"
                    />
                </label>
                <label>
                    Calories Burned:
                    <input
                        type="number"
                        name="caloriesBurned"
                        value={workoutInput.caloriesBurned}
                        onChange={handleInputChange}
                        placeholder="Enter calories burned"
                    />
                </label>
            </div>

            <button onClick={submitWorkout}>Submit</button>
        </div>
    );
};

export default ChestPage;
