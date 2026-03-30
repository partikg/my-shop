var mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    stock: {
        type: String
    },
    category: {
        type: String,
    },
    slug: {
        type: String,
        unique: true
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;