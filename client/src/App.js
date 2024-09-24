// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Tracker from './components/Tracker';
import Contact from './components/Contact';
import './App.css';
import Chatbot from './components/Chatbot';

function App() {
    return (
        <Router>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tracker" element={<Tracker />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/Chatbot" element={<Chatbot />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

// testing a commit req

export default App;
