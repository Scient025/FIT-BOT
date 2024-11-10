import React from 'react';

function WorkoutCard({ workout }) {
    return (
        <div className="workout-card">
            <img src={workout.imageUrl} alt={workout.name} />
            <h2>{workout.type}</h2>
            <p>Sets: {workout.sets}</p>
            <p>Reps: {workout.reps}</p>
            <p>Weight: {workout.weight} kg</p>
            <p>Calories Burned: {workout.caloriesBurned}</p>
        </div>
    );
}

export default WorkoutCard;
