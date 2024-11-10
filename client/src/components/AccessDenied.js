import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = () => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>coulnt access this page</h2>
        <p>please log in to access this page.</p>
        <Link to="/login">login here</Link>
    </div>
);

export default AccessDenied;
