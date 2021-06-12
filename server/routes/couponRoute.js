const router = require('express').Router();
const { authChecker, adminChecker } = require('../middlewares/authMiddleware');
const {
    createNewCoupon,
    getAllCoupons,
    deleteCoupon,
    getCouponById,
} = require('../controllers/couponController');

// create a new coupon
// route -> /coupon/
router.post('/', authChecker, adminChecker, createNewCoupon);
// get all coupons
// route -> /coupon/
router.get('/', authChecker, adminChecker, getAllCoupons);
// get a coupon
// route -> /coupon/:name
router.get('/:name', authChecker, getCouponById);
// delete a coupon
// route -> /coupon/:id
router.delete('/:id', authChecker, adminChecker, deleteCoupon);
module.exports = router;
