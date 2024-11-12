import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BicepsPage.css';
import './workoutPage.css';

const BicepsPage = () => {
    const [workout, setWorkout] = useState(null);
    const [workoutInput, setWorkoutInput] = useState({
        exercise: '',
        weight: '',
        sets: '',
        reps: '',
        caloriesBurned: ''
    });

    const [savedWorkouts, setSavedWorkouts] = useState([]);

    // Fetch workout data for Biceps exercises
    const getWorkout = async () => {
        let data = {
            type: 'Biceps',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Bicep Curls',
                    videoUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'This classic exercise isolates the biceps and is great for overall development. To perform a bicep curl, stand with your feet shoulder-width apart, holding a dumbbell in each hand with your arms fully extended by your sides. Keeping your elbows close to your torso, curl the weights up towards your shoulders, squeezing your biceps at the top. Lower the weights back down with control and repeat.'
                },
                {
                    exercise: 'Hammer Curls',
                    videoUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Similar to the bicep curl, hammer curls target the biceps as well as the brachialis and brachioradialis muscles. To perform a hammer curl, stand with a dumbbell in each hand, arms fully extended, but with your palms facing each other (neutral grip). Curl the weights up towards your shoulders while maintaining the neutral grip, and then lower them back down slowly.'
                },
                {
                    exercise: 'Chin Ups',
                    videoUrl: 'https://i.pinimg.com/originals/8e/3c/a8/8e3ca8b47008f15ddaae99939f211bd8.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'This compound exercise not only works the biceps but also engages the back and shoulders. To perform a chin-up, grip a pull-up bar with your palms facing you and your hands shoulder-width apart. Hang with your arms fully extended, then pull your body up until your chin is above the bar. Lower yourself back down and repeat.'
                }
            ]
        };

        setWorkout(data);
    };

    // Fetch saved workouts from the backend
    const getSavedWorkouts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/fitness/biceps');
            setSavedWorkouts(response.data); // Update state with the fetched saved workouts
        } catch (error) {
            console.error('Error fetching saved workouts:', error);
        }
    };

    useEffect(() => {
        getWorkout(); // Fetch the workout exercises
        getSavedWorkouts(); // Fetch saved workouts when the page loads
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
            const response = await axios.post('http://localhost:5000/api/fitness/biceps', workoutInput);
            console.log('Server response:', response.data);
            alert('Biceps workout saved successfully!');
            setWorkoutInput({ exercise: '', weight: '', sets: '', reps: '', caloriesBurned: '' });
            getSavedWorkouts(); // Refresh saved workouts list after saving
        } catch (error) {
            console.error('Error saving workout:', error);
            alert(`Failed to save workout: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className='BicepsPage'>
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

            <div className="BicepsPage__form-container">
                <h2>Add a Biceps Workout</h2>
                <form onSubmit={submitWorkout} className='BicepsPage__form'>
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

            <div className="BicepsPage__saved-container">
                <h2>Saved Workouts</h2>
                <div className="BicepsPage__saved-workouts">
                    {savedWorkouts.length === 0 ? (
                        <p>No saved workouts yet.</p>
                    ) : (
                        savedWorkouts.map((workout, index) => (
                            <div key={index} className="BicepsPage__saved-workout">
                                <p><strong>Exercise:</strong> {workout.exercise}</p>
                                <p><strong>Weight:</strong> {workout.weight} kg</p>
                                <p><strong>Sets:</strong> {workout.sets}</p>
                                <p><strong>Reps:</strong> {workout.reps}</p>
                                <p><strong>Calories Burned:</strong> {workout.caloriesBurned}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default BicepsPage;
