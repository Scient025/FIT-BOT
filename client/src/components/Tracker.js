import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Tracker.css';

const Tracker = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [workouts, setWorkouts] = useState(null);

    const getWorkouts = async () => {
        const data = [
            {
                type: 'Chest',
                imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            },
            {
                type: 'Abs',
                imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            },
            {
                type: 'Shoulder',
                imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',

            },
            {
                type: 'Back',
                imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFjayUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',

            },
            {
                type: 'Biceps',
                imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',

            },
            {
                type: 'Triceps',
                imageUrl: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJpY2Vwc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            },
            {
                type: 'Legs',
                imageUrl: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVnJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',

            },
            {
                type: 'Forearms',
                imageUrl: 'https://images.unsplash.com/photo-1591940742878-13aba4b7a34e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZWFybXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',

            }
            // Add more workouts as needed...
        ];
        setWorkouts(data);
    };

    useEffect(() => {
        getWorkouts();
    }, []);

    return (
        <div className="tracker-page">
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Workouts Section */}
            <h1 className="main-heading">Workouts</h1>
            <div className="workouts-container">
                {
                    workouts && workouts.map((item, index) => {
                        return (
                            <Link to={`/workout/${item.type.toLowerCase()}`} className="workout-card" key={index}>
                                <div
                                    className="workout-card-image"
                                    style={{
                                        backgroundImage: `url(${item.imageUrl})`,
                                    }}
                                ></div>
                                <h2 className="workout-card-title">{item.type}</h2>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Tracker;
