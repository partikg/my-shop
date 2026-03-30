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

describe('Product Routes', () => {

    test('POST /api/product/add - should add a new product successfully', async () => {
        const res = await request(app)
            .post('/api/product/add')
            .send({ name: 'Test Shoes', price: '99', description: 'test description', stock: '3', category: 'shoes' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('name', 'Test Shoes');
    });

    test('POST /api/product/add - should fail if required fields missing', async () => {
        const res = await request(app)
            .post('/api/product/add')
            .send({});
        expect(res.statusCode).toBe(500);
    });

    test('GET /api/product/products - should return all products as an array', async () => {
        const res = await request(app)
            .get('/api/product/products')
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    })

    test('GET /api/product/:slug - should return a single product by slug', async () => {

        const created = await request(app)
            .post('/api/product/add')
            .send({ name: 'Test Shoes', price: '99', description: 'test desc', stock: '3', category: 'shoes' })

        const productslug = created.body.slug;

        const res = await request(app)
            .get(`/api/product/products/${productslug}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('slug', productslug);
    })

    test('GET /api/product/:slug - should return 404 if product not found', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .get('/api/product/products/fake-slug-that-doesnt-exist')
        expect(res.statusCode).toBe(404);
    })

    test('PUT /api/product/update/:id - should update a product successfully', async () => {

        const created = await request(app)
            .post('/api/product/add')
            .send({ name: 'Test Shoes', price: '99', description: 'test desc', stock: '3', category: 'shoes' })

        const productId = created.body._id;

        const res = await request(app)
            .put(`/api/product/update/${productId}`)
            .send({ name: 'Updated Shoes', price: '120', description: 'Updated desc', stock: '5', category: 'shoes' })
        expect(res.statusCode).toBe(200);
    })

    test('PUT /api/product/update/:id - should fail if product doesnt exist', async () => {
        const objectId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .put(`/api/product/update/${objectId}`)
            .send({
                name: 'Something',
                price: '100'
            })
        expect(res.statusCode).toBe(404);
    })

    test('DELETE /api/product/delete/:id - should delete a product successfully', async () => {

        const created = await request(app)
            .post('/api/product/add')
            .send({ name: 'Test Shoes', price: '99', description: 'test desc', stock: '3', category: 'shoes' })

        const productId = created.body._id;

        const res = await request(app)
            .delete(`/api/product/delete/${productId}`)
            .send({})
        expect(res.statusCode).toBe(200);
    })

    test('DELETE /api/product/delete/:id - should return 404 if product doesnt exist', async () => {
        const objectId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .delete(`/api/product/delete/${objectId}`)
            .send({})
        expect(res.statusCode).toBe(404);
    })

});