// src/components/Home.js
import React from 'react';

const Home = () => {
    return (
        <div>
            <div className="jumbotron text-center">
                <h1>Welcome to FIT-BOT</h1>
                <p>Your personal fitness assistant. Track your goals and improve your health!</p>
            </div>
            <div className="row text-center">
                <div className="col-md-4">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Track Your Progress</h5>
                            <p className="card-text">Stay on top of your fitness journey with our intuitive tracker.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Personalized Plans</h5>
                            <p className="card-text">Get gym and diet plans crafted by our intelligent bot.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Expert Assistance</h5>
                            <p className="card-text">Connect with fitness trainers and get feedback in real-time.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
