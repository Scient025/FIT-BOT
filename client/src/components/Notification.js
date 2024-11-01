// src/components/Notification.js
import React from 'react';
import './Notification.css';

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification" onClick={onClose}>
      {message}
    </div>
  );
};

export default Notification;
