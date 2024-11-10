import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spline from '@splinetool/react-spline';
import './signUp.css';

function Signup({ setIsAuthenticated, onSignUp }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:5000/api/register', {
                name,
                email,
                password
            });

            const token = result.data.token;
            if (token) {
                localStorage.setItem('authToken', token);
                setIsAuthenticated(true);
                onSignUp(); 
                navigate('/home');
            } else {
                setErrorMessage('Registration failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('Error occurred during registration. Please check your inputs or try again later.');
        }
    };

    return (
        <div className="signup-container">
            <Spline
                scene="https://prod.spline.design/Du4trVvICiT5NtSh/scene.splinecode"
                className="spline-background"
            />
            <div className="signup-form">
                <h2>Register</h2>

                {errorMessage && <p className="text-danger">{errorMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p>Already Have an Account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;