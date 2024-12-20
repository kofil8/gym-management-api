# Gym Scheduling System

## Project Overview

The Gym Scheduling System is a web application built with Node.js and MongoDB that allows users to register, log in, and manage their workout schedules. Administrators can manage users and oversee class schedules.

## Project Details

The project is a web application that allows users to register, log in, and manage their workout schedules. Administrators can manage users and oversee class schedules.
Visit Notion for a detailed description of the project.
https://assorted-seatbelt-dd1.notion.site/Gym-Management-System-159a93a2d5038091b266cf188d780aa7

## Project Structure

- `src`: The main directory containing the source code.
  - `index.js`: The main entry point of the application.
  - `routes`: Directory containing route handlers.
    - `userRoutes.js`: Handles user-related routes.
    - `classScheduleRoutes.js`: Handles class schedule-related routes.
  - `models`: Directory containing Mongoose models.
    - `User.js`: User model.
    - `ClassSchedule.js`: Class schedule model.
  - `controllers`: Directory containing controller functions.
    - `userController.js`: Handles user-related operations.
    - `classScheduleController.js`: Handles class schedule-related operations.
  - `middleware`: Directory containing middleware functions.
    - `auth.js`: Handles authentication middleware.
    - `inputValidation.js`: Handles input validation middleware.
    - `errorHandler.js`: Handles error middleware.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/gym-scheduling-system.git`
2. Navigate into the directory: `cd gym-scheduling-system`
3. Install dependencies: `npm install`
4. Set up environment variables in a `.env` file:
   ```
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   PORT=5000
   ```
5. Start the development server: `npm run dev`

## Relation Diagram

Relational Diagram: https://app.eraser.io/workspace/T0PcOAZhSSKkmBodPvLd

## Technology Stack

- Node.js
- Express.js
- Mongoose
- MongoDB
- JWT for authentication

## API Endpoints

- **Users**

  - `GET /api/users`: Returns a list of all users.
  - `POST /api/users/register`: Registers a new user. Expects `{username, password, role}`.
  - `POST /api/users/login`: Logs in a user. Expects `{username, password}`. Returns a JWT token.
  - `GET /api/users/profile`: Returns the logged-in user's profile. Requires authentication.

- **Class Schedules**
  - `GET /api/class-schedules`: Retrieves all class schedules. Requires authentication.
  - `POST /api/class-schedules`: Creates a new class schedule. Expects `{date, time, trainerId}`. Requires admin role.
  - `POST /api/class-schedules/book`: Books a class schedule. Expects `{scheduleId}`. Requires trainee role.

## Database Schema

**User Model**

- `username`: String, required, unique
- `password`: String, required
- `role`: String, enum ['admin', 'trainer', 'trainee'], required

**ClassSchedule Model**

- `trainer`: ObjectId, ref 'User', required
- `date`: Date, required
- `time`: String, required
- `trainees`: Array of ObjectId, ref 'User'

## Admin Credentials

- **Username**: adminuser
- **Password**: adminpassword

## Instructions to Run Locally

1. Clone the repository:
   ```
   git clone <repository_url>
   ```
2. Navigate into the directory:
   ```
   cd gym-scheduling-system
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables in a `.env` file:
   ```
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   PORT=5000
   ```
5. Start the development server:
   ```
   npm run dev
   ```

Access the application at [http://localhost:5000](https://gym-management-api-i69z.onrender.com/).

## Live Hosting Link

[Visit the live application](https://gym-management-api-i69z.onrender.com/)
