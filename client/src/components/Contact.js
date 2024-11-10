import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';

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
            await axios.post('http://localhost:5000/api/fitness/contact', formData);
            setFormData({ name: '', email: '', message: '' });
            toast.success('Thank you for reaching out! We will get back to you shortly.');
        } catch (error) {
            console.error('Error submitting the form', error);
            toast.error('Failed to send your message. Please try again later.');
        }
    };

    return (
        <div className='contact'>
            <form className="contact-container" onSubmit={handleSubmit}>
                <h2 className="text-center">Contact Us</h2>
                <div className="jumbotron bg-light text-dark text-center">
                    <p>If you have any questions or need assistance, please fill out the form below.</p>
                </div>
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
            {/* Change autoClose from 3000 to 10000 (10 seconds) */}
            <ToastContainer position="top-right" autoClose={10000} hideProgressBar closeOnClick pauseOnHover draggable />
        </div>
    );
};

export default Contact;
