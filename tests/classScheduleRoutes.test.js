const request = require('supertest');
const app = require('../index'); // Import your Express app
const mongoose = require('mongoose');

describe('Class Schedule Routes', () => {
    let adminToken;

    beforeAll(async () => {
        // Connect to the test database
        await mongoose.connect(process.env.TEST_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Register and login the admin user to get a token
        const adminRegistrationResponse = await request(app)
            .post('/api/users/register')
            .send({
                username: 'adminuser',
                password: 'adminpassword',
                role: 'admin',
            });

        const adminLoginResponse = await request(app)
            .post('/api/users/login')
            .send({
                username: 'adminuser',
                password: 'adminpassword',
            });

        adminToken = adminLoginResponse.body.token; // Store the token for authenticated requests
    });

    afterAll(async () => {
        // Close the database connection
        await mongoose.connection.close();
    });

    it('should create a class schedule', async () => {
        const newSchedule = {
            date: '2024-12-01',
            time: '10:00',
            trainerId: 'someTrainerId', // Replace with a valid trainer ID
        };

        const response = await request(app)
            .post('/api/class-schedules')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newSchedule);

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
    });

    it('should book a class schedule', async () => {
        const newSchedule = {
            date: '2024-12-01',
            time: '10:00',
            trainerId: 'someTrainerId', // Replace with a valid trainer ID
        };

        const createdScheduleResponse = await request(app)
            .post('/api/class-schedules')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newSchedule);

        const createdScheduleId = createdScheduleResponse.body.classSchedule._id; // Get the schedule ID

        const booking = {
            scheduleId: createdScheduleId,
        };

        const bookingResponse = await request(app)
            .post('/api/class-schedules/book')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(booking);

        expect(bookingResponse.statusCode).toBe(200);
        expect(bookingResponse.body.success).toBe(true);
    });
});
