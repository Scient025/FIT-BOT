import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BackPage.css';
import './workoutPage.css';

const BackPage = () => {
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
            type: 'Back',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Pull Ups',
                    videoUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'A bodyweight exercise that primarily targets the upper back, specifically the latissimus dorsi, as well as the biceps and shoulders. Pull-ups involve hanging from a bar with an overhand grip and pulling your body upward until your chin is above the bar.'
                },
                {
                    exercise: 'Bent Over Rows',
                    videoUrl: 'https://media.tenor.com/AYJ_bNXDvoUAAAAM/workout-muscles.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'This exercise can be performed with a barbell or dumbbells and effectively targets the mid-back, including the rhomboids and trapezius. To perform a bent-over row, hinge at the hips with a slight bend in the knees, keeping your back straight, and pull the weights towards your torso.'
                },
                {
                    exercise: 'Deadlifts',
                    videoUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'A compound exercise that works multiple muscle groups, including the entire back, hamstrings, and glutes. To perform a deadlift, stand with your feet hip-width apart, grip a barbell on the floor, and lift it by extending your hips and knees until you are standing upright, keeping your back straight throughout the movement.'
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
            const response = await axios.post('http://localhost:5000/api/fitness/back', workoutInput);
            console.log('Server response:', response.data);
            alert('Back workout saved successfully!');
            setWorkoutInput({ exercise: '', weight: '', sets: '', reps: '', caloriesBurned: '' });
        } catch (error) {
            console.error('Error saving workout:', error);
            alert(`Failed to save workout: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className='BackPage'>
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
            
            <div className="BackPage__form-container">
            <h2>Add a Back Workout</h2>
            <form onSubmit={submitWorkout} className='BackPage__form'>
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

export default BackPage;

