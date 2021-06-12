const { Schema, model } = require('mongoose');

const couponSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            uppercase: true,
            minLength: [6, 'The string length is short'],
            maxLength: [12, 'The string should be less than 12 characters'],
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Coupon = model('Coupon', couponSchema);
module.exports = Coupon;
