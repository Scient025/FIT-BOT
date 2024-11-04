import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TricepsPage.css';
import './workoutPage.css';

const TricepsPage = () => {
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
            type: 'Triceps',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Tricep Dips',
                    videoUrl: 'https://i.pinimg.com/originals/71/a5/8f/71a58fff86280c49002e0149f8cea3a4.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'This exercise can be done using parallel bars or a sturdy bench. To perform tricep dips, position your hands shoulder-width apart on the bars or bench, with your legs extended in front of you. Lower your body by bending your elbows until your upper arms are parallel to the ground, then push back up to the starting position. Keep your elbows close to your body to maximize tricep activation.'
                },
                {
                    exercise: 'Skull Crushers',
                    videoUrl: 'https://i.pinimg.com/originals/2b/22/90/2b22905614256e610257662a2ea92635.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Also known as lying tricep extensions, skull crushers isolate the triceps effectively. To perform this exercise, lie on a bench with a barbell or dumbbells held above your chest, arms fully extended. Bend your elbows to lower the weight towards your forehead (hence the name), then extend your arms back to the starting position. Ensure to control the movement throughout to avoid strain.'
                },
                {
                    exercise: 'Tricep Pushdowns',
                    videoUrl: 'https://fitnessprogramer.com/wp-content/uploads/2022/11/One-arm-triceps-pushdown.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'This exercise is typically performed using a cable machine with a rope or straight bar attachment. Stand facing the machine and grasp the handle with both hands at chest level. Keeping your elbows close to your sides, push the handle down until your arms are fully extended. Pause for a moment at the bottom before slowly returning to the starting position.'
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
            const response = await axios.post('http://localhost:5000/api/fitness/triceps', workoutInput);
            console.log('Server response:', response.data);
            alert('Triceps workout saved successfully!');
            setWorkoutInput({ exercise: '', weight: '', sets: '', reps: '', caloriesBurned: '' });
        } catch (error) {
            console.error('Error saving workout:', error);
            alert(`Failed to save workout: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className='TricepsPage'>
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
            
            <div className="TricepsPage__form-container">
            <h2>Add a Triceps Workout</h2>
            <form onSubmit={submitWorkout} className='TricepsPage__form'>
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

export default TricepsPage;

