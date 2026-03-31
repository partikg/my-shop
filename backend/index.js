require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const razorpayRoute = require("./src/routes/razorpay");
const webhookRoute = require('./src/routes/webhook');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/webhook', webhookRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', require('./src/routes/userRoutes'));
app.use('/api/product', require('./src/routes/productRoutes'));
app.use('/api/order', require('./src/routes/orderRoutes'));
app.use('/uploads/products', express.static('uploads/products'));
app.use("/api/razorpay", razorpayRoute);
app.use('/api/admin', require('./src/routes/adminRoutes'));

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));

    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`);
    });
}

module.exports = app;