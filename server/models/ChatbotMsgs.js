import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        userMessage: {
            type: String,
            required: true,
        },
        botMessage: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'chatbot_queries'
    }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
