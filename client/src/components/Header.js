// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">FIT-BOT</Link>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tracker">Tracker</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="Chatbot">Chatbot</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Network</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/query">Support</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
