const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/OrderModel');
const User = require('../models/UserModel');

const paymentIntended = async (req, res) => {
    const { totalAmount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100,
        currency: 'usd',
    });
    res.json({
        clientSecret: paymentIntent.client_secret,
    });
};

const createNewOrder = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        // eslint-disable-next-line object-curly-newline
        const { products, totalAmount, discount, shippingAddress, paymentMethod } = req.body;
        const order = new Order({
            products,
            totalAmount,
            discount,
            shippingAddress,
            paymentMethod,
            orderBy: user._id,
        });
        const savedOrder = await order.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};
const getUserOrders = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });

        if (!user) res.status(400).json({ error: 'User Not Found!' });

        const orders = await Order.find({ orderBy: user._id })
            .populate({
                path: 'products',
                populate: {
                    path: 'product',
                    model: 'Product',
                },
            })
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate({
            path: 'products',
            populate: {
                path: 'product',
                model: 'Product',
            },
        });
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('products.product').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findOneAndUpdate(
            { _id: id },
            { $set: { status: req.body.value } },
            { new: true }
        );
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createNewOrder,
    paymentIntended,
    getUserOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
};
