import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AbsPage.css';
import './workoutPage.css';

const AbsPage = () => {
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
            type: 'Abs',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Planks',
                    videoUrl: 'https://media.tenor.com/oMn86R4_ncIAAAAM/abd.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'This isometric exercise engages the entire core, including the rectus abdominis, obliques, and transverse abdominis. To perform a plank, lie face down and then lift your body off the ground, supporting it with your forearms and toes. Keep your body in a straight line from head to heels, and hold the position for as long as possible.'
                },
                {
                    exercise: 'Crunches',
                    videoUrl: 'https://i.pinimg.com/originals/fb/7d/88/fb7d88e46efd63d70963c84c02974414.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'A classic abdominal exercise that primarily targets the rectus abdominis. To perform a crunch, lie on your back with your knees bent and feet flat on the floor. Place your hands behind your head or across your chest, then lift your shoulders off the ground by contracting your abs. Lower back down and repeat.'
                },
                {
                    exercise: 'Russian Twists',
                    videoUrl: 'https://media0.giphy.com/media/cpKD9u3S25xYL8tcbr/giphy.gif?cid=6c09b9524sjq92sjg8zdj0npnzn4bx8h2bb0uhkske4vlio0&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'This exercise focuses on the obliques, helping to develop rotational strength in the core. To perform Russian twists, sit on the floor with your knees bent and lean back slightly. Hold a weight or medicine ball with both hands and twist your torso to the right, then to the left, while keeping your feet elevated off the ground for added difficulty.'
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
            const response = await axios.post('http://localhost:5000/api/fitness/abs', workoutInput);
            console.log('Server response:', response.data);
            alert('Abs workout saved successfully!');
            setWorkoutInput({ exercise: '', weight: '', sets: '', reps: '', caloriesBurned: '' });
        } catch (error) {
            console.error('Error saving workout:', error);
            alert(`Failed to save workout: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className='AbsPage'>
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
            
            <div className="AbsPage__form-container">
            <h2>Add an Abs Workout</h2>
            <form onSubmit={submitWorkout} className='AbsPage__form'>
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

export default AbsPage;

