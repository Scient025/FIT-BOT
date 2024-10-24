import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signUp.css';

function Signup({ setIsAuthenticated }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Post request to register the user
            const result = await axios.post('http://localhost:5000/api/register', {
                name,
                email,
                password
            });

            console.log(result);

            // Assuming the response contains a token (modify based on your API response)
            // const token = result.data.token;
            // if (token) {
            //     // Save token in localStorage
            //     localStorage.setItem('authToken', token);

            // Instead of expecting a token, check if result is successful
            if (result.status === 201) {
                // Registration is successful
                // Save user data in localStorage if needed
                localStorage.setItem('userData', JSON.stringify(result.data));

                // Set authentication state to true
                setIsAuthenticated(true);

                // Navigate to home page after successful registration
                navigate('/login');
            } else {
                setErrorMessage('Registration failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('Error occurred during registration. Please check your inputs or try again later.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
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
