const request = require('supertest');
const app = require('../src/index');

describe('User  Routes', () => {
  let connection;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.TEST_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should register a new user', async () => {
    const response = await request(app).post('/api/users/register').send({
      username: 'testuser',
      password: 'testpassword',
      role: 'trainee',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('should login a user', async () => {
    const response = await request(app).post('/api/users/login').send({
      username: 'testuser',
      password: 'testpassword',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });
});
