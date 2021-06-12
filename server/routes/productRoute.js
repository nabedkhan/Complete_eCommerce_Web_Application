const router = require('express').Router();
const { authChecker, adminChecker } = require('../middlewares/authMiddleware');
const {
    createNewProduct,
    getAllProducts,
    getNewArrivalProducts,
    deleteProduct,
    updateProduct,
    getProductBySlug,
    getBestSellingProducts,
    getRelatedProducts,
    getProductsByCategory,
    getProductsBySubCategory,
    updateProductWithRating,
} = require('../controllers/productController');

router
    .route('/')
    // create a product
    // route -> product/
    .post(authChecker, adminChecker, createNewProduct)
    // get all products
    // route -> product/
    .get(getAllProducts);

router
    .route('/:slug')
    // update a single product by help of slug
    // route -> product/:slug
    .put(authChecker, adminChecker, updateProduct)
    // get a single product by help of slug
    // route -> product/:slug
    .get(getProductBySlug);

// get the new arrival limited number of products
// route -> product/10
router.get('/list/:limit', getNewArrivalProducts);
// get the best selling limited number of products
// route -> product/10
router.get('/selling/:limit', getBestSellingProducts);
// get related products by help category id
// route -> product/related/:id
router.get('/related/:id', getRelatedProducts);
// get products by help category id
// route -> product/related/:id
router.get('/category/:id', getProductsByCategory);
// get products by help subcategory id
// route -> product/related/:id
router.get('/subcategory/:id', getProductsBySubCategory);
// delete a single product by help of id
// route -> product/:id
router.delete('/:id', authChecker, adminChecker, deleteProduct);
// update product with user rating
// route -> product/:slug/rating
router.put('/:slug/rating', authChecker, updateProductWithRating);

module.exports = router;
