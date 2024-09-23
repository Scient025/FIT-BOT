import React, { useState } from 'react';

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
        <div>
            <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.user ? 'right' : 'left' }}>
                        <p style={{ background: msg.user ? '#d1e7ff' : '#f1f1f1', display: 'inline-block', padding: '5px 10px', borderRadius: '5px' }}>
                            {msg.text}
                        </p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask ChatGPT..."
                    style={{ width: '80%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ width: '18%', marginLeft: '2%', padding: '10px', borderRadius: '5px', background: 'black', color: 'white' }}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
