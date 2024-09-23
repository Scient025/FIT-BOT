// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Tracker from './components/Tracker';
import Query from './components/Query';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tracker" element={<Tracker />} />
                    <Route path="/query" element={<Query />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
