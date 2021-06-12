const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: 32,
            text: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxLength: 2000,
            text: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        subcategory: {
            type: Schema.Types.ObjectId,
            ref: 'SubCategory',
        },
        quantity: {
            type: Number,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
        },
        shipping: {
            type: String,
            enum: ['Yes', 'No'],
        },
        color: {
            type: String,
            enum: ['Black', 'Brown', 'Sliver', 'White', 'Blue'],
        },
        brand: {
            type: String,
            required: true,
            lowercase: true,
        },
        reviews: [
            {
                rating: Number,
                comment: String,
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
    },
    {
        timestamps: true,
        // eslint-disable-next-line comma-dangle
    }
);
const Product = model('Product', productSchema);
module.exports = Product;
