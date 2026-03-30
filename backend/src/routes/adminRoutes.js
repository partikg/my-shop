const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const isAdmin = require('../middleware/isAdmin')

router.get('/summary', isAdmin, adminController.getSummary)
router.get('/orders', isAdmin, adminController.getAllOrders)
router.put('/orders/:id', isAdmin, adminController.updateOrderStatus)

module.exports = router