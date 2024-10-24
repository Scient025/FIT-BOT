import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill out all fields.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/fitness/contact', formData);
            console.log(response.data);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error submitting the form', error);
        }
    };

    return (
        <div>
            <h2 className="text-center">Contact Us</h2>
            <div className="jumbotron bg-light text-dark text-center">
                <p>If you have any questions or need assistance, please fill out the form below.</p>
            </div>
            <form className="contact-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name" onChange={handleChange} value={formData.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" onChange={handleChange} value={formData.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea className="form-control" id="message" rows="5" placeholder="Enter your message" onChange={handleChange} value={formData.message}></textarea>
                </div>
                <button type="submit" className="btn btn-dark">Submit</button>
            </form>
        </div>
    );
};

export default Contact;
