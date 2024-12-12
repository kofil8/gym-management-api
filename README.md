# Gym Scheduling System

This is a simple gym scheduling system built with Node.js and MongoDB. The system allows users to create an account, log in, and schedule workouts. The system also allows administrators to create new users, view user schedules, and delete users.

## Installation

To install the system, run the following commands in your terminal:

    npm install

## Running the System

To run the system, run the following command in your terminal:

    npm run dev

This will start the system on port 3000. You can access the system by going to [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

The system provides the following endpoints:

    GET /users: Returns a list of all users in the system.
    POST /users: Creates a new user. Expects a JSON object with the following properties: {name, email, password}.
    GET /users/:id: Returns the user with the specified id.
    PUT /users/:id: Updates the user with the specified id. Expects a JSON object with the following properties: {name, email, password}.
    DELETE /users/:id: Deletes the user with the specified id.
    POST /users/:id/schedule: Creates a new workout schedule for the user with the specified id. Expects a JSON object with the following properties: {startDate, endDate}.
# gym-management-api
