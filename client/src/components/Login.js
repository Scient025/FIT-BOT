import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spline from '@splinetool/react-spline';
import './Login.css';

function Login({ setIsAuthenticated, onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            const token = response.data.token;
            if (token) {
                localStorage.setItem('authToken', token);
                setIsAuthenticated(true);
                onLogin(); // Trigger notification
                navigate('/home');
            } else {
                setErrorMessage('Login failed. Please check your credentials.');
            }
        } catch (err) {
            if (err.response?.data?.message === 'Token expired') {
                setErrorMessage('Session expired. Please login again.');
            } else {
                console.error(err);
                setErrorMessage('Error occurred during login. Please try again later.');
            }
        }
    };

    return (
        <div className="login-container">
            <Spline
                scene="https://prod.spline.design/Du4trVvICiT5NtSh/scene.splinecode"
                className="spline-background" 
            />
            <div className="login-form">
                <h2>Login</h2>

                {errorMessage && <p className="text-danger">{errorMessage}</p>}

                <form onSubmit={handleSubmit}>
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
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                <p>Don't Have an Account?</p>
                <Link to="/signUp" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up now!
                </Link>
            </div>
        </div>
    );
}

export default Login;