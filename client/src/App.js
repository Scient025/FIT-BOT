// src/App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Header from './components/Header';
import Home from './components/Home';
import Tracker from './components/Tracker';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import SignUp from './components/signUp';
import Login from './components/Login';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Function to check if the token is expired
    const isTokenExpired = (token) => {
        if (!token) return true; // No token means it's expired
        const decoded = jwtDecode(token); // Use jwtDecode here
        return decoded.exp * 1000 < Date.now(); // Check if the token is expired
    };

    // Check if the user is logged in based on localStorage
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

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <>
            {/* Conditional rendering of headers */}
            <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/contact" element={<Contact />} />

                {/* Redirect root to login/signup */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />

                {/* Private routes (only accessible when logged in) */}
                <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path="/tracker" element={isAuthenticated ? <Tracker /> : <Navigate to="/login" />} />
                <Route path="/chatbot" element={isAuthenticated ? <Chatbot /> : <Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default App;
