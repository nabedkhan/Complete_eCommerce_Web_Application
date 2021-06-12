const admin = require('../firebase/firebase');
const User = require('../models/UserModel');

const authChecker = async (req, res, next) => {
    try {
        const { token } = req.headers;
        const firebaseUser = await admin.auth().verifyIdToken(token);
        // set req object
        req.user = firebaseUser;
        next();
    } catch (error) {
        res.status(401).json({
            error: 'Invalid or expired token',
        });
    }
};

const adminChecker = async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({ email });
    if (user && user.role === 'admin') {
        next();
    } else {
        res.status(401);
        res.json({
            error: 'Access denied route',
        });
    }
};

module.exports = {
    authChecker,
    adminChecker,
};
