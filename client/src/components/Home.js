import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <section className="features-section py-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-4">
                            <i className="fas fa-running fa-3x text-primary"></i>
                            <h3 className="mt-3">Track Workouts</h3>
                            <p>Log and monitor your daily workout routines.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="fas fa-heartbeat fa-3x text-primary"></i>
                            <h3 className="mt-3">Monitor Health</h3>
                            <p>Keep track of key health metrics like heart rate, calories, and steps.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="fas fa-users fa-3x text-primary"></i>
                            <h3 className="mt-3">Join the Community</h3>
                            <p>Connect with others, share progress, and stay motivated.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
