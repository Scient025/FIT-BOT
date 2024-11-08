import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Hero from './components/hero';
import Programs from './components/Programs';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Tracker from './components/Tracker';
import Contact from './components/Contact';
import Community from './components/Community';
import Chatbot from './components/Chatbot';
import SignUp from './components/signUp';
import Login from './components/Login';
import Footer from './components/Footer';
import AccessDenied from './components/AccessDenied';
import BackPage from './components/BackPage';
import LegsPage from './components/LegsPage';
import ChestPage from './components/ChestPage';
import AbsPage from './components/AbsPage';
import ShouldersPage from './components/ShoulderPage';
import TricepsPage from './components/TricepsPage';
import BicepsPage from './components/BicepsPage';
import ForearmsPage from './components/ForearmsPage';
import Notification from './components/Notification';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const isTokenExpired = (token) => {
        if (!token) return true;
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            if (!isTokenExpired(token)) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('authToken');
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        showNotification("Successfully logged out!");
        navigate('/login');
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 7000);
    };

    const handleLogin = () => {
        showNotification("Successfully logged in!");
    };

    const handleSignup = () => {
        showNotification("Successfully signed up!");
    };

    return (
        <>
            <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

            {notification && (
                <Notification message={notification} onClose={() => setNotification(null)} />
            )}

            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} onLogin={handleLogin} />} />
                <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} onSignUp={handleSignup} />} />
                <Route path="/contact" element={<Contact />} />

                {/* Redirect root to login/signup */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />

                {/* Private routes (only accessible when logged in) */}
                <Route path="/home" element={isAuthenticated ? (
                    <>
                        <Home />
                        <Hero />
                        <Programs />
                    </>
                ) : (
                    <AccessDenied />
                )} />
                <Route path="/tracker" element={isAuthenticated ? <Tracker /> : <AccessDenied />} />
                <Route path="/chatbot" element={isAuthenticated ? <Chatbot /> : <AccessDenied />} />
                <Route path="/community" element={isAuthenticated ? <Community /> : <AccessDenied />} />

                {/* Workout-specific routes */}
                <Route path="/workout/back" element={<BackPage />} />
                <Route path="/workout/legs" element={<LegsPage />} />
                <Route path="/workout/chest" element={<ChestPage />} />
                <Route path="/workout/abs" element={<AbsPage />} />
                <Route path="/workout/shoulders" element={<ShouldersPage />} />
                <Route path="/workout/triceps" element={<TricepsPage />} />
                <Route path="/workout/biceps" element={<BicepsPage />} />
                <Route path="/workout/forearms" element={<ForearmsPage />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
