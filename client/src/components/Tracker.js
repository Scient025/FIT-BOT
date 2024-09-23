import React from 'react';

const Tracker = () => {
    return (
        <div>
            <h2 className="text-center">Fitness Tracker</h2>
            <div className="jumbotron bg-light text-dark text-center">
                <p>Log your workouts, track your progress, and set fitness goals.</p>
                <p>Visualize your performance over time with graphs and statistics.</p>
            </div>
            <div className="text-center">
                <button className="btn btn-dark">Start Tracking</button>
            </div>
        </div>
    );
};

export default Tracker;
