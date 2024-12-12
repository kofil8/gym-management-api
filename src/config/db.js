const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from the environment variables
        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

// Export the connectDB function
module.exports = connectDB;