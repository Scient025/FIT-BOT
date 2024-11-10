import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChestPage.css';
import './workoutPage.css';

const ChestPage = () => {
    const [workout, setWorkout] = useState(null);
    const [workoutInput, setWorkoutInput] = useState({
        exercise: '',
        weight: '',
        sets: '',
        reps: '',
        caloriesBurned: ''
    });

    const getWorkout = async () => {
        let data = {
            type: 'Chest',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Flat Bench Press',
                    videoUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDNmcGRhNG1ybDA0cGxjYjRpdDN1Y3FjYnJudWZvZDJ5OGd5bWk2YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WwMtx7eOmZdoZkQesF/giphy.webp',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Targets the middle pectoral muscles by pressing weights upward while lying flat, promoting overall chest size and strength.'
                },
                {
                    exercise: 'Incline Bench Press',
                    videoUrl: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDd0NmZubHNmNTZwbGphZWNoYjNoZjV6bGEya2N3eGt3c2UyajFrZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xAPVsCd4SbHEBTZPZx/giphy.webp',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'This variation involves setting the bench at an incline (usually around 30–45 degrees), shifting focus to the upper chest muscles.'
                },
                {
                    exercise: 'Decline Bench Press',
                    videoUrl: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnRuZWhsNDdpNzRvYTU2bjVmcm9nazh3YWNsdXhlZDZheGs0aDEybiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3YHsKO2NLc9dfygzXK/giphy.webp',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Performed on a bench angled downward, this exercise emphasizes the lower chest muscles.'
                }
            ]
        };

        setWorkout(data);
    };

    useEffect(() => {
        getWorkout();
    }, []);

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
            const response = await axios.post('http://localhost:5000/api/fitness/chests', workoutInput);
            console.log('Server response:', response.data);
            alert('Chest workout saved successfully!');
            setWorkoutInput({ exercise: '', weight: '', sets: '', reps: '', caloriesBurned: '' });
        } catch (error) {
            console.error('Error saving workout:', error);
            alert(`Failed to save workout: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className='ChestPage'>
            <h1>{workout?.type} Workout Exercises</h1>
            <div className='workout__exercises'>
                {workout?.exercises.map((item, index) => (
                    <div key={index} className={index % 2 === 0 ? 'workout__exercise' : 'workout__exercise workout__exercise--reverse'}>
                        <div className='workout__exercise__image'>
                            <img src={item.videoUrl} alt={item.exercise} />
                        </div>
                        <div className='workout__exercise__content'>
                            <h2>{item.exercise}</h2>
                            <span>{item.sets} sets X {item.reps} reps</span>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="ChestPage__form-container">
            <h2>Add a Chest Workout</h2>
            <form onSubmit={submitWorkout} className='ChestPage__form'>
                <div className="form-group">
                <input
                type="text"
                name="exercise"
                placeholder="Exercise"
                value={workoutInput.exercise}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <input
                type="number"
                name="weight"
                placeholder="Weight"
                value={workoutInput.weight}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <input
                type="number"
                name="sets"
                placeholder="Sets"
                value={workoutInput.sets}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <input
                type="number"
                name="reps"
                placeholder="Reps"
                value={workoutInput.reps}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <input
                type="number"
                name="caloriesBurned"
                placeholder="Calories Burned"
                value={workoutInput.caloriesBurned}
                onChange={handleInputChange}
                />
            </div>
            <button type="submit">Submit Workout</button>
        </form>
        </div>
    </div>
    );
};

export default ChestPage;

