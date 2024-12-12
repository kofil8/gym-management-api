const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const classScheduleRoutes = require('./routes/classScheduleRoutes');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

// Initiale  Default Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Gym Management System API',
    routes: {
      '/api/users': 'User routes',
      '/api/class-schedules': 'Class Schedule routes',
    },
    subroutes: {
      '/api/users': {
        '/register': 'Register a new user',
        '/login': 'Login a user',
        '/profile': 'Get user profile',
      },
      '/api/class-schedules': {
        '/': 'Get all class schedules',
        '/book': 'Book a class schedule',
      },
    },
  });
});

app.use('/api/users', userRoutes);
app.use('/api/class-schedules', classScheduleRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
