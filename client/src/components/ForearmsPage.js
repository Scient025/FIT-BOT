import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ForearmsPage.css';
import './workoutPage.css';

const ForearmsPage = () => {
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
            type: 'Forearms',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Wrist Curls',
                    videoUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Wrist-Curl.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'This exercise targets the flexor muscles of the forearm. To perform wrist curls, sit on a bench and rest your forearms on your thighs, holding a dumbbell in each hand with your palms facing up. Allow your wrists to hang over your knees. Curl the weights up by flexing your wrists, then slowly lower them back down.'
                },
                {
                    exercise: 'Reverse Wrist Curls',
                    videoUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Reverse-Wrist-Curl.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'This exercise targets the extensor muscles of the forearm. Similar to wrist curls, sit on a bench and rest your forearms on your thighs, but this time hold the dumbbells with your palms facing down. Curl the weights up by extending your wrists, then lower them back down.'
                },
                {
                    exercise: 'Farmers Walk',
                    videoUrl: 'https://fitnessprogramer.com/wp-content/uploads/2022/02/Farmers-walk_Cardio.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'This functional exercise not only strengthens your forearms but also engages your grip, shoulders, and core. To perform a farmers walk, grab a heavy dumbbell or kettlebell in each hand. Stand tall with your feet shoulder-width apart and walk a specific distance or for a certain amount of time while holding the weights at your sides. Focus on keeping a strong grip throughout the walk. '
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
            const response = await axios.post('http://localhost:5000/api/fitness/forearms', workoutInput);
            console.log('Server response:', response.data);
            alert('Forearms workout saved successfully!');
            setWorkoutInput({ exercise: '', weight: '', sets: '', reps: '', caloriesBurned: '' });
        } catch (error) {
            console.error('Error saving workout:', error);
            alert(`Failed to save workout: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className='ForearmsPage'>
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
            
            <div className="ForearmsPage__form-container">
            <h2>Add a Forearms Workout</h2>
            <form onSubmit={submitWorkout} className='ForearmsPage__form'>
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

export default ForearmsPage;

