const express = require('express');
const { register, login } = require('../controllers/userController');
const auth = require('../middleware/auth');
const inputValidation = require('../middleware/inputValidation');
const {
    validateUserRegistration,
    validateUserLogin,
    checkValidationResult,
} = require('../middleware/inputValidation');
const router = express.Router();

// Public routes
router.post('/register', validateUserRegistration, checkValidationResult, register);
router.post('/login', validateUserLogin, checkValidationResult, login);

// Protected routes
router.get('/profile', auth, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;