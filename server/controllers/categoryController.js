const slugify = require('slugify');
const Category = require('../models/CategoryModel');

const createNewCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = new Category({
            name,
            slug: slugify(name),
        });

        const newCategory = await category.save();
        res.json(newCategory);
    } catch (error) {
        res.status(400);
        res.json({ error: 'Create category failed' });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ createdAt: -1 });
        res.json(categories);
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const getCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await Category.findOne({ slug });
        if (!category) {
            res.status(404);
            res.json({ error: 'Category does not exist' });
        } else {
            res.status(200);
            res.json(category);
        }
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const { name } = req.body;
        const category = await Category.findOneAndUpdate(
            { slug },
            // eslint-disable-next-line comma-dangle
            { name, slug: slugify(name) }
        );
        if (!category) {
            res.status(404);
            res.json({ error: 'Category does not exist' });
        } else {
            res.status(200);
            res.json({ message: 'Category updated successfully' });
        }
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await Category.findOne({ slug });
        if (!category) {
            res.status(404);
            res.json({ error: 'Category does not exist' });
        } else {
            res.status(200);
            await category.remove();
            res.json({ message: 'Category removed successfully' });
        }
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

module.exports = {
    createNewCategory,
    getAllCategories,
    getCategoryBySlug,
    updateCategory,
    deleteCategory,
};
