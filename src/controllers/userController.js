const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
const register = async (req, res) => {
    const { username, password, role } = req.body;

    // Check if the user already exists
    const existingUser  = await User.findOne({ username });
    if (existingUser ) {
        return res.status(400).json({
            success: false,
            message: 'User  already exists',
            errorDetails: {
                field: 'username',
                message: 'User  already exists',
            }
        });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username,
            role: user.role,
        },
        });
};

// User Login
const login = async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'Invalid credentials',
            errorDetails: {
                field: 'username',
                message: 'Invalid credentials',
            }
        });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: 'Invalid credentials',
            errorDetails: {
                field: 'password',
                message: 'Invalid credentials',
            }
        });
    }

    // Create and assign a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
        success: true,
        statusCode: 200,
        message: 'Login successful',
        token,
        user: {
            id: user._id,
            username: user.username,
            role: user.role,
        }
    });
};

// Export the controller functions
module.exports = { register, login };