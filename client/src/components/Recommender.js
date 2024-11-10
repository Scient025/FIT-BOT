import React, { useState } from 'react';
import WorkoutCard from './WorkoutCard';
import Filters from './Filters';

const Recommender = () => {
    const [workouts, setWorkouts] = useState([]);
    const [filters, setFilters] = useState({
        bodyPart: '',
        skillLevel: '',
        equipment: '',
        workoutType: ''
    });

    const fetchWorkouts = async () => {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`http://localhost:5000/api/recommender?${queryParams}`);
        const data = await response.json();
        setWorkouts(data);
    };

    return (
        <div>
            <h1>Workout Recommender</h1>
            <Filters setFilters={setFilters} />
            <button onClick={fetchWorkouts}>Get Recommendations</button>
            <div className="workout-list">
                {workouts.map(workout => (
                    <WorkoutCard key={workout._id} workout={workout} />
                ))}
            </div>
        </div>
    );
}

export default Recommender;
