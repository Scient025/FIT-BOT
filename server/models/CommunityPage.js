import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    username: { type: String, required: true },
    comments: [
        {
            username: { type: String, required: true },
            comment: { type: String, required: true }
        }
    ]
}, { timestamps: true });

const Community = mongoose.model('Community', CommunitySchema);

export default Community;
