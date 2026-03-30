const orderModel = require('../models/Order')
const userModel = require('../models/User')

const getSummary = async (req, res) => {
    try {
        const totalOrders = await orderModel.countDocuments()
        const orders = await orderModel.find()
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
        const processing = await orderModel.countDocuments({ orderStatus: 'Processing' })
        const shipped = await orderModel.countDocuments({ orderStatus: 'Shipped' })
        const delivered = await orderModel.countDocuments({ orderStatus: 'Delivered' })

        res.json({ totalOrders, totalRevenue, processing, shipped, delivered })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('user', 'name email')
        res.json(orders)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const order = await orderModel.findByIdAndUpdate(req.params.id,
            { orderStatus: req.body.orderStatus },
            { new: true }
        )
        res.json(order)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { getSummary, getAllOrders, updateOrderStatus }