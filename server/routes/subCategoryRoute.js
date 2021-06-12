const router = require('express').Router();
const {
    createNewSubCategory,
    getAllSubCategories,
    getSubCategoryBySlug,
    deleteSubCategory,
    updateSubCategory,
} = require('../controllers/subCategoryController');
const { authChecker, adminChecker } = require('../middlewares/authMiddleware');

router
    .route('/')
    // create a new sub category
    // route -> /subcategory/
    .post(authChecker, adminChecker, createNewSubCategory)
    // get all sub catagories
    // route -> /subcategory/
    .get(authChecker, adminChecker, getAllSubCategories);

router
    .route('/:slug')
    // get a single sub category by help of slug
    // route -> /subcategory/:slug
    .get(getSubCategoryBySlug)
    // delete a single sub category by help of slug
    // route -> /subcategory/:slug
    .delete(authChecker, adminChecker, deleteSubCategory)
    // update a single sub category by help of slug
    // route -> /subcategory/:slug
    .put(authChecker, adminChecker, updateSubCategory);

module.exports = router;
