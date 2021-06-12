const router = require('express').Router();
const {
    createNewCategory,
    getAllCategories,
    getCategoryBySlug,
    deleteCategory,
    updateCategory,
} = require('../controllers/categoryController');
const { authChecker, adminChecker } = require('../middlewares/authMiddleware');

router
    .route('/')
    // create a new category
    // route -> category/
    .post(authChecker, adminChecker, createNewCategory)
    // get all catagories
    // route -> category/
    .get(getAllCategories);

router
    .route('/:slug')
    // get a single category by help of slug
    // route -> category/:slug
    .get(getCategoryBySlug)
    // delete a single category by help of slug
    // route -> category/:slug
    .delete(authChecker, adminChecker, deleteCategory)
    // update a single category by help of slug
    // route -> category/:slug
    .put(authChecker, adminChecker, updateCategory);

module.exports = router;
