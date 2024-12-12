const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT tokens
const auth = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1];
    
    // If no token is provided, return an unauthorized error
    if (!token) return res.status(401).json({ message: 'Unauthorized access' });

    try {
        // Verify the token using the secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach the verified user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // If token verification fails, return an unauthorized error
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Export the authentication middleware
module.exports = auth;