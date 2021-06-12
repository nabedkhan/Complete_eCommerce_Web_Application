const slugify = require('slugify');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');

const createNewProduct = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title);
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (error) {
        res.status(400);
        res.json({ error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('reviews.user').sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const getNewArrivalProducts = async (req, res) => {
    const number = Number(req.params.limit);
    try {
        const products = await Product.find({})
            .limit(number)
            .populate('category')
            .populate('subcategory')
            .sort({ createdAt: -1 });

        res.json(products);
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const getBestSellingProducts = async (req, res) => {
    const number = Number(req.params.limit);
    try {
        const products = await Product.find({})
            .limit(number)
            .populate('category')
            .populate('subcategory')
            .sort({ sold: -1 });

        res.json(products);
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const getRelatedProducts = async (req, res) => {
    const { id } = req.params;
    try {
        const products = await Product.find({ category: id }).limit(3);
        res.json(products);
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({ slug })
            .populate('category')
            .populate('subcategory')
            .select(['-createdAt', '-updatedAt', '-__v']);
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { slug } = req.params;
        req.body.slug = slugify(req.body.title);
        await Product.findOneAndUpdate({ slug }, req.body);
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

// eslint-disable-next-line consistent-return
const updateProductWithRating = async (req, res) => {
    try {
        const { slug } = req.params;
        const { rating, comment } = req.body;
        const user = await User.findOne({ email: req.user.email });
        const product = await Product.findOne({ slug });
        if (product) {
            const findUser = product.reviews.find(
                (item) => item.user.toString() === user._id.toString()
            );
            if (findUser) {
                return res.status(400).json({ error: 'Product already reviewed' });
            }

            await Product.findOneAndUpdate(
                { slug },
                { $set: { reviews: [...product.reviews, { rating, comment, user: user._id }] } },
                { new: true }
            );
            res.status(200).json({ message: 'Product reviewed successfully' });
        }
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        await product.remove();
        res.status(200).json({ message: 'Product Remove Successfully' });
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.find({ category: id });
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const getProductsBySubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.find({ subcategory: id });
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

module.exports = {
    createNewProduct,
    getAllProducts,
    getNewArrivalProducts,
    getBestSellingProducts,
    getRelatedProducts,
    getProductBySlug,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductsBySubCategory,
    updateProductWithRating,
};
