require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../index');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/ecommerce_test')
});

afterAll(async () => {
    await mongoose.disconnect();
})

describe('Payment Routes', () => {

    test('POST /api/razorpay - should create a razorpay order', async () => {
        const res = await request(app)
            .post('/api/razorpay')
            .send({})

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('amount')
        expect(res.body.currency).toBe('INR')
    })
})