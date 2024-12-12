const ClassSchedule = require('../models/ClassSchedule');
const User = require('../models/User');

// Create a Class Schedule
const createClassSchedule = async (req, res) => {
  const { date, time, trainerId } = req.body;

  // Check if the admin is creating the schedule
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied',
      errorDetails: {
        field: 'role',
        message: 'Access denied. Only admins can create class schedules.',
      },
    });
  }

  // Check if the date and time are valid
  const existingSchedules = await ClassSchedule.find({ date });
  if (existingSchedules.length >= 5) {
    return res.status(400).json({
      success: false,
      message: 'Date already has 5 class schedules',
      errorDetails: {
        field: 'date',
        message: 'Date already has 5 class schedules',
      },
    });
  }

  // Create a new class schedule
  const classSchedule = new ClassSchedule({
    trainer: trainerId,
    date,
    time,
    trainees: [],
  });

  await classSchedule.save();
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Class schedule created successfully',
    classSchedule,
    trainer: await User.findById(trainerId),
  });
};

// Get All Class Schedules
const getClassSchedules = async (req, res) => {
  try {
    const schedules = await ClassSchedule.find().populate(
      'trainer',
      'username'
    );
    res.json({
      success: true,
      statusCode: 200,
      message: 'Class schedules retrieved successfully',
      schedules,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      errorDetails: {
        field: 'server',
        message: 'Internal Server Error',
      },
    });
  }
};

// Book a Class Schedule
const bookClassSchedule = async (req, res) => {
  const { scheduleId } = req.body;

  // Check if the trainee is booking the class
  if (req.user.role !== 'trainee') {
    return res.status(403).json({
      success: false,
      message: 'Access denied',
      errorDetails: {
        field: 'role',
        message: 'Access denied. Only trainees can book class schedules.',
      },
    });
  }

  // Find the class schedule
  const classSchedule = await ClassSchedule.findById(scheduleId);
  if (!classSchedule) {
    return res.status(404).json({
      success: false,
      message: 'Class schedule not found',
      errorDetails: {
        field: 'scheduleId',
        message: 'Class schedule not found',
      },
    });
  }

  // Check if the class is already full
  if (classSchedule.trainees.length >= 10) {
    return res.status(400).json({
      success: false,
      message: 'Class schedule is already full',
      errorDetails: {
        field: 'scheduleId',
        message: 'Class schedule is already full',
      },
    });
  }

  // Add the trainee to the class schedule
  classSchedule.trainees.push(req.user.id);
  await classSchedule.save();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Class schedule booked successfully',
    classSchedule,
    trainee: await User.findById(req.user.id),
  });
};

// Export the controller functions
module.exports = { createClassSchedule, getClassSchedules, bookClassSchedule };
