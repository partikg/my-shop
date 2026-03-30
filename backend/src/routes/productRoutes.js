const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { upload } = require('../config/cloudinary')

router.get('/products', productController.getProducts);
router.post('/add', upload.single('image'), productController.createProduct);
router.put('/update/:id', upload.single('image'), productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/products/:slug', productController.getProductById);

module.exports = router;