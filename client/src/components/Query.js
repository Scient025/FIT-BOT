import React from 'react';

const Query = () => {
    return (
        <div>
            <h2 className="text-center">Contact Us</h2>
            <div className="jumbotron bg-light text-dark text-center">
                <p>If you have any questions or need assistance, please fill out the form below.</p>
            </div>
            <form className="container">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea className="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
                </div>
                <button type="submit" className="btn btn-dark">Submit</button>
            </form>
            <h3 className="text-center mt-4">Contact Details</h3>
            <table className="table table-dark mt-3">
                <thead>
                    <tr>
                        <th>Contact Method</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>info@sportsclub.com</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>(123) 456-7890</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>123 Sports Avenue, Sportstown, SP 12345</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Query;
