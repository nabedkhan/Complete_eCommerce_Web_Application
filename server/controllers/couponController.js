const Coupon = require('../models/CoponModel');

const createNewCoupon = async (req, res) => {
    try {
        const { name, expiryDate, discount } = req.body;
        const coupon = await new Coupon({ name, expiryDate, discount });
        const savedCoupon = await coupon.save();
        res.status(200).json(savedCoupon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({}).sort({ createdAt: -1 });
        res.status(200).json(coupons);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// eslint-disable-next-line consistent-return
const getCouponById = async (req, res) => {
    try {
        const { name } = req.params;
        const coupon = await Coupon.find({ name });
        if (coupon.length < 1) {
            return res.status(400).json({ error: 'Invalid Coupon' });
        }
        res.status(200).json(coupon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon.findById(id);
        if (coupon) {
            await coupon.remove();
            res.status(200).json({ message: 'Coupon removed successfully' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = {
    createNewCoupon,
    getAllCoupons,
    deleteCoupon,
    getCouponById,
};
