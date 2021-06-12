const router = require('express').Router();
const { uploadImages, removeImage } = require('../controllers/cloudinaryController');
const { authChecker, adminChecker } = require('../middlewares/authMiddleware');

// upload images for product
// route -> upload/
router.post('/', authChecker, adminChecker, uploadImages);
// remove images from product
// route -> category/:id
router.delete('/:id', authChecker, adminChecker, removeImage);

module.exports = router;
