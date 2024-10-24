import React from 'react';
import './Home.css';
import fitnessImage from './fitness-image.jpg';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-image">
          <img src={fitnessImage} alt="Fitness Tracking" />
        </div>
        <div className="hero-content">
          <h1>Transform Your Fitness Journey</h1>
          <p>Track your workouts, set goals, and achieve your fitness dreams with ease.</p>
          <div className="cta-buttons">
            <button className="cta-button">Get Started</button>
            <button className="cta-button secondary">Log In</button>
          </div>
        </div>
      </div>
      <div className={`py-5 text-center text-light`}>
        <div className="container">
          <h3>What we provide</h3><br></br>
          <div className="row g-4">
            <div className="col-md-4">
              <div className={`p-4 shadow-sm h-100`}>
                <h4>Custom Workouts</h4>
                <p>Tailored exercises based on your fitness level, goals, and preferences. Start your journey with plans designed just for you.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`p-4 shadow-sm h-100`}>
                <h4>Nutrition Tracking</h4>
                <p>Monitor your meals and macros to stay on top of your diet. Our tools help you maintain a healthy and balanced lifestyle.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`p-4 shadow-sm h-100`}>
                <h4>Community Support</h4>
                <p>Connect with fitness enthusiasts, share tips, and stay motivated through group challenges and community discussions.</p>
              </div>
            </div>
            <h3>Join us on your Fitness Journey</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
