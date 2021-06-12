const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
    {
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                color: String,
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        // discount: Number,
        shippingAddress: {
            type: Object,
            required: true,
        },
        orderBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        paymentMethod: {
            type: Object,
            required: true,
        },
        status: {
            type: String,
            default: 'processing',
            enum: ['processing', 'processed', 'completed'],
        },
    },
    {
        timestamps: true,
    }
);

const Order = model('Order', orderSchema);
module.exports = Order;
