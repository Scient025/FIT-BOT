import React from 'react';
import { Link } from 'react-router-dom';
import './AccessDenied.css';

const AccessDenied = () => (
    <div className="access-denied-container">
        <div className="access-denied-content">
            <h2>Could not access this page</h2>
            <p>Please log in to access this page.</p>
            <Link to="/login" className="login-button">Login Here</Link>
        </div>
    </div>
);

export default AccessDenied;
