const User = require('../models/UserModel');

const createOrUpdateUser = async (req, res) => {
    try {
        const { email } = req.user;
        const { name, image, address } = req.body;
        const user = await User.findOneAndUpdate(
            { email },
            {
                name: name || 'Unknown User',
                image,
                address,
            },
            // eslint-disable-next-line prettier/prettier
            { new: true },
        );
        if (user) {
            res.json(user);
        } else {
            const createUser = new User({ email });
            const newUser = await createUser.save();
            res.json(newUser);
        }
    } catch (error) {
        res.status(401).json({
            error: 'Error occurred in user route',
        });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ error: 'Authentication failed!' });
        }
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred!' });
    }
};

module.exports = {
    createOrUpdateUser,
    getCurrentUser,
};
