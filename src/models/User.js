const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'trainer', 'trainee'], required: true },
});

// Export the User model
module.exports = mongoose.model('User ', userSchema);