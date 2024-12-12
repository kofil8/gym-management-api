const mongoose = require('mongoose');

// Define the class schedule schema
const classScheduleSchema = new mongoose.Schema({
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    trainees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User ' }],
});

// Export the ClassSchedule model
module.exports = mongoose.model('ClassSchedule', classScheduleSchema);