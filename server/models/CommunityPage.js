import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comments: [
        {
            username: String,
            comment: String
        }
    ]
}, { timestamps: true });

const Community = mongoose.model('Community', CommunitySchema);

export default Community;
