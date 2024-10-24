import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // Function to handle sending messages
    const sendMessage = async (message) => {
        setMessages([...messages, { user: true, text: message }]);

        // Fetch response from the backend
        const response = await fetch('/api/chatbot/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        const botResponse = data.reply;

        // Append bot response to chat
        setMessages((prevMessages) => [
            ...prevMessages,
            { user: false, text: botResponse },
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.user ? 'user' : 'bot'}`}>
                        <p className={`chat-bubble ${msg.user ? 'user' : 'bot'}`}>
                            {msg.text}
                        </p>
                    </div>
                ))}
            </div>
            <form className="chat-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask ChatGPT..."
                    className="chat-input"
                />
                <button type="submit" className="chat-submit">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
