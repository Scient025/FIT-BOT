// src/App.js
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

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        navigate('/login');
    };

    return (
        <>
            <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
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
                    <Navigate to="/login" />
                )} />
                <Route path="/tracker" element={isAuthenticated ? <Tracker /> : <Navigate to="/login" />} />
                <Route path="/chatbot" element={isAuthenticated ? <Chatbot /> : <Navigate to="/login" />} />
                <Route path="/community" element={isAuthenticated ? <Community /> : <Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default App;
