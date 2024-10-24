import mongoose from 'mongoose';

const registerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const registerModel = mongoose.model("register", registerSchema);
export default registerModel;
