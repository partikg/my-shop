const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const orderModel = require('../models/Order');
const { json } = require('stream/consumers');

router.post('/razorpay', express.raw({ type: 'application/json' }), async (req, res) => {

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const receivedSignature = req.headers['x-razorpay-signature'];

    // verify signature
    const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(req.body)
        .digest('hex');

    if (expectedSignature !== receivedSignature) {
        return res.status(400).json({ message: 'Invalid signature' })
    }

    // parse event
    const event = JSON.parse(req.body.toString());

    // handle event 
    if (event.event === 'payment.captured') {
        const paymentId = event.payload.payment.entity.id;
        console.log('Payment Captured:', paymentId);

        await orderModel.findOneAndUpdate(
            { paymentId: paymentId },
            { paymentStatus: 'Completed' }
        );
    }

    if (event.event === 'payment.failed') {
        const paymentId = event.payload.payment.entity.id;
        console.log('Payment failed:', paymentId);
        await orderModel.findOneAndUpdate(
            { paymentId: paymentId },
            { paymentStatus: 'Failed' }
        )
    }

    res.status(200).json({ received: true });
});

module.exports = router;