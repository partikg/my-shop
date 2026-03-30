const productModel = require("../models/Product");
const slugify = require('slugify');
const mongoose = require('mongoose');

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

const getProductById = async (req, res) => {
    try {
        const { slug } = req.params;

        const isMongoId = mongoose.Types.ObjectId.isValid(slug);

        const product = isMongoId
            ? await productModel.findById(slug)
            : await productModel.findOne({ slug: slug });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

const createProduct = async (req, res) => {
    try {
        const slug = slugify(req.body.name, { lower: true });
        let data = new productModel({
            name: req.body.name,
            image: req.file?.path,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock,
            category: req.body.category,
            slug: slug,
            created_at: Date.now(),
            updated_at: Date.now(),
        });
        const savedProduct = await data.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        let updateData = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock,
            category: req.body.category,
            updated_at: Date.now(),
        };

        if (req.file) updateData.image = req.file.path;

        if (req.body.name) {
            updateData.slug = slugify(req.body.name, { lower: true });
        }

        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!product) return res.status(404).json({ message: 'Product not found' });


        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deleted = await productModel.findByIdAndDelete(
            req.params.id
        );
        if (!deleted) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};