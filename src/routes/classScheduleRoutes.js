const express = require('express');
const { createClassSchedule, getClassSchedules, bookClassSchedule } = require('../controllers/classScheduleController');
const auth = require('../middleware/auth');
const {
    validateClassScheduleCreation,
    validateBooking,
    checkValidationResult,
} = require('../middleware/inputValidation');
const router = express.Router();

// Protected routes for class scheduling
router.post('/', auth, validateClassScheduleCreation, checkValidationResult, createClassSchedule);
router.get('/', auth, getClassSchedules);
router.post('/book', auth, validateBooking, checkValidationResult, bookClassSchedule);

module.exports = router;