import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LegsPage.css';
import './workoutPage.css';

const LegsPage = () => {
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
            type: 'Legs',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Squats',
                    videoUrl: 'https://samysart.com/wp-content/uploads/2023/07/back-squat.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Squats are a fundamental compound exercise that targets multiple muscle groups, including the quadriceps, hamstrings, glutes, and calves. To perform a squat, stand with your feet shoulder-width apart, engage your core, and lower your body as if you’re sitting back into a chair. Keep your chest up and knees behind your toes as you descend. Aim to go as low as you can while maintaining good form, then push through your heels to return to the starting position.'
                },
                {
                    exercise: 'Lunges',
                    videoUrl: 'https://fitnessprogramer.com/wp-content/uploads/2023/09/power-lunge.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Lunges are excellent for building strength and stability in your legs. To perform a lunge, start standing with your feet hip-width apart. Step forward with one leg, lowering your hips until both knees are bent at about a 90-degree angle. Your back knee should hover just above the ground. Push through the front heel to return to the starting position, and repeat on the other side.'
                },
                {
                    exercise: 'Leg Press',
                    videoUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/08/Lever-Horizontal-Leg-Press.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'The leg press machine is a great way to target the quadriceps, hamstrings, and glutes. To perform the leg press, sit on the machine with your back against the pad and feet placed shoulder-width apart on the platform. Push the platform away by extending your legs while keeping a slight bend in your knees. Lower the platform back down with control until your knees are at about a 90-degree angle, then push back up.'
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
            const response = await axios.post('http://localhost:5000/api/fitness/legs', workoutInput);
            console.log('Server response:', response.data);
            alert('Legs workout saved successfully!');
            setWorkoutInput({ exercise: '', weight: '', sets: '', reps: '', caloriesBurned: '' });
        } catch (error) {
            console.error('Error saving workout:', error);
            alert(`Failed to save workout: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className='LegsPage'>
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
            
            <div className="LegsPage__form-container">
            <h2>Add a Legs Workout</h2>
            <form onSubmit={submitWorkout} className='LegsPage__form'>
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

export default LegsPage;

