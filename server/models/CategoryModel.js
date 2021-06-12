const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            minLength: 3,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
    },
    {
        timestamps: true,
        // eslint-disable-next-line comma-dangle
    }
);
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
