const router = require('express').Router();
const {
    createNewOrder,
    paymentIntended,
    getUserOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
} = require('../controllers/orderController');
const { authChecker, adminChecker } = require('../middlewares/authMiddleware');

// create a new payment
// route -> /order/create-payment
router.post('/create-payment', authChecker, paymentIntended);
// get orders for admin user
// route -> /order/admin
router.get('/admin', authChecker, adminChecker, getAllOrders);
// update a order status
// route -> /order/:id
router.put('/admin/:id', authChecker, adminChecker, updateOrderStatus);
// create a new order
// route -> /order/
router.post('/', authChecker, createNewOrder);
// get orders for a user
// route -> /order/
router.get('/', authChecker, getUserOrders);
// get a single order
// route -> /order/:id
router.get('/:id', authChecker, getOrderById);

module.exports = router;
