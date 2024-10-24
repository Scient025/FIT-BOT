import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            
            // Check if the response contains a token
            const token = response.data.token;
            if (token) {
                // Save the token in localStorage
                localStorage.setItem('authToken', token);

                // Set authentication state to true
                setIsAuthenticated(true);

                // Navigate to home page
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
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
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
