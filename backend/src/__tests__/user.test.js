require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../index');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/ecommerce_test');
}, 15000);

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (let key in collections) {
        await collections[key].deleteMany();
    }
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('User Routes', () => {

    test('POST /api/user/register - should register a new user', async () => {
        const res = await request(app)
            .post('/api/user/register')
            .send({ name: 'Test User', email: 'test@gmail.com', password: 'test1234', address: 'Nagpur', role: 'user' });
        expect(res.body.status).toBe(true);
        expect(res.body.token).toBeDefined();
    }, 15000);

    test('POST /api/user/login - should login with correct credentials', async () => {
        await request(app).post('/api/user/register')
            .send({ name: 'Test', email: 'test@gmail.com', password: 'test1234', address: 'Nagpur', role: 'user' });

        const res = await request(app).post('/api/user/login')
            .send({ email: 'test@gmail.com', password: 'test1234' });
        expect(res.body.status).toBe(true);
        expect(res.body.token).toBeDefined();
    }, 15000);

    test('POST /api/user/login - should fail with wrong password', async () => {
        await request(app).post('/api/user/register')
            .send({ name: 'Test', email: 'test@gmail.com', password: 'test1234', address: 'Nagpur', role: 'user' });

        const res = await request(app).post('/api/user/login')
            .send({ email: 'test@gmail.com', password: 'wrongpassword' });
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe('incorrect password');
    }, 15000);

    test('POST /api/user/login - should fail with wrong email', async () => {
        const res = await request(app).post('/api/user/login')
            .send({ email: 'nobody@gmail.com', password: 'test1234' });
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe('incorrect email and password');
    }, 15000);

    test('GET /api/user/users - should return list of users', async () => {
        const res = await request(app).get('/api/user/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }, 15000);

});