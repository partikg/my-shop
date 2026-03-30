require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../index');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/ecommerce_test');
}, 15000)

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (let key in collections) {
        await collections[key].deleteMany();
    }
})

afterAll(async () => {
    await mongoose.disconnect();
})

let userId;
let orderId;

beforeEach(async () => {
    const userRes = await request(app)
        .post('/api/user/add')
        .send({
            name: "Test User",
            email: "test@test.com",
            password: "123456",
            address: "test",
            role: "user"
        });
    userId = userRes.body._id;

    const orderRes = await request(app)
        .post('/api/order/add')
        .send({
            user: userId,
            items: [{ name: 'Test Shirt', price: 199, stock: 2 }],
            total: 199,
            paymentStatus: 'Completed',
            orderStatus: 'Shipped'
        });
    orderId = orderRes.body._id;
})

describe('Orders Routes', () => {

    test('POST /api/order/add - should add a new order successfully', async () => {

        const res = await request(app)
            .post('/api/order/add')
            .send({
                user: userId,
                items: [{ name: 'Test Shirt', price: 199, stock: 2 }],
                total: 199,
                paymentStatus: 'Completed',
                orderStatus: 'Shipped'
            });

        expect(res.statusCode).toBe(201);
    });

    test('POST /api/order/add - should fail if required fields missing', async () => {
        const res = await request(app)
            .post('/api/order/add')
            .send({});
        expect(res.statusCode).toBe(201);
    });

    test('GET /api/order/orders - should return all orders as an array', async () => {
        const res = await request(app)
            .get('/api/order/orders')
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    })

    test('GET /api/order/orders/:id - should return a single order by id', async () => {

        const res = await request(app)
            .get(`/api/order/orders/${orderId}`)
        expect(res.statusCode).toBe(200);
        expect(res.body.order).toHaveProperty('_id', orderId);
    })

    test('GET /api/order/:id - should return 404 if order not found', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .get(`/api/order/orders/${fakeId}`)
        expect(res.statusCode).toBe(404);
    })

    test('GET /api/order/:id - should return 404 if order not found', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .get(`/api/order/orders/${fakeId}`)
        expect(res.statusCode).toBe(404);
    })

    test('PUT /api/order/update/:id - should update a order successfully', async () => {

        const res = await request(app)
            .put(`/api/order/update/${orderId}`)
            .send({
                user: userId,
                items: [{ name: 'Updated Shirt', price: 300, stock: 6 }],
                total: 500,
                paymentStatus: 'Failed',
                orderStatus: 'Delivered'
            })
        expect(res.statusCode).toBe(200);
    })

    test('PUT /api/order/update/:id - should fail if order doesnt exist', async () => {
        const objectId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .put(`/api/order/update/${objectId}`)
            .send({ status: 'delivered' })
        expect(res.statusCode).toBe(404);
    })

    test('DELETE /api/order/delete/:id - should delete a order successfully', async () => {

        const res = await request(app)
            .delete(`/api/order/delete/${orderId}`)
            .send({})
        expect(res.statusCode).toBe(200);
    })

    test('DELETE /api/order/delete/:id - should return 404 if order doesnt exist', async () => {
        const objectId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .delete(`/api/order/delete/${objectId}`)
            .send({})
        expect(res.statusCode).toBe(404);
    })
});