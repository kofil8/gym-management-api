// middleware/inputValidation.js
const { body, validationResult } = require('express-validator');

// Validation rules for user registration
const validateUserRegistration = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role')
        .notEmpty().withMessage('Role is required')
        .isIn(['admin', 'trainer', 'trainee']).withMessage('Role must be admin, trainer, or trainee'),
];

// Validation rules for user login
const validateUserLogin = [
    body('username')
        .notEmpty().withMessage('Username is required'),
    body('password')
        .notEmpty().withMessage('Password is required'),
];

// Validation rules for class schedule creation
const validateClassScheduleCreation = [
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be in ISO 8601 format (YYYY-MM-DD)'),
    body('time')
        .notEmpty().withMessage('Time is required')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Time must be in HH:mm format'),
    body('trainerId')
        .notEmpty().withMessage('Trainer ID is required'),
];

// Validation rules for class booking
const validateBooking = [
    body('scheduleId')
        .notEmpty().withMessage('Schedule ID is required'),
];

// Middleware to check validation results
const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation error occurred',
            errorDetails: errors.array(),
        });
    }
    next();
};

// Export validation functions
module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateClassScheduleCreation,
    validateBooking,
    checkValidationResult,
};