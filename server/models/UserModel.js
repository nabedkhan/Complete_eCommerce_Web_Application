const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            required: true,
            index: true,
        },
        role: {
            type: String,
            default: 'subscriber',
        },
        image: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
        },
        address: String,
    },
    {
        timestamp: true,
        // eslint-disable-next-line prettier/prettier
    },
);

const User = model('User', userSchema);
module.exports = User;
