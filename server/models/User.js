const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    strength: Object,
    gymPlan: Object,
    dietPlan: Object,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
