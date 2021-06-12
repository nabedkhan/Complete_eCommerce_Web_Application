const router = require('express').Router();
const { authChecker, adminChecker } = require('../middlewares/authMiddleware');
const { createOrUpdateUser, getCurrentUser } = require('../controllers/authController');

// create a new user or update existing user
// route -> auth/user
router.post('/user', authChecker, createOrUpdateUser);
// get current user
// route -> auth/current_user
router.get('/current_user', authChecker, getCurrentUser);
// get current admin user
// route -> auth/current_admin
router.get('/current_admin', authChecker, adminChecker, getCurrentUser);

module.exports = router;
