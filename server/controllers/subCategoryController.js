const slugify = require('slugify');
const SubCategory = require('../models/SubCategoryModel');

const createNewSubCategory = async (req, res) => {
    const { name, parent } = req.body;
    try {
        const subCategory = new SubCategory({
            name,
            parent,
            slug: slugify(name),
        });

        const newSubCategory = await subCategory.save();
        res.json(newSubCategory);
    } catch (error) {
        res.status(400);
        res.json({ error: 'Create Sub Category Failed' });
    }
};

const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({}).sort({ createdAt: -1 });
        res.json(subCategories);
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const getSubCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const subCategory = await SubCategory.findOne({ slug });
        if (!subCategory) {
            res.status(404);
            res.json({ error: 'Sub Category does not exist' });
        } else {
            res.status(200);
            res.json(subCategory);
        }
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const updateSubCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const { name, parent } = req.body;
        const subCategory = await SubCategory.findOneAndUpdate(
            { slug },
            // eslint-disable-next-line comma-dangle
            { name, parent, slug: slugify(name) }
        );
        if (!subCategory) {
            res.status(404);
            res.json({ error: 'Sub category does not exist' });
        } else {
            res.status(200);
            res.json({ message: 'Sub category updated successfully' });
        }
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

const deleteSubCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const subCategory = await SubCategory.findOne({ slug });
        if (!subCategory) {
            res.status(404);
            res.json({ error: 'Sub category does not exist' });
        } else {
            res.status(200);
            await subCategory.remove();
            res.json({ message: 'Sub category removed successfully' });
        }
    } catch (error) {
        res.status(500);
        res.json({ error: 'Server error occurred' });
    }
};

module.exports = {
    createNewSubCategory,
    getAllSubCategories,
    getSubCategoryBySlug,
    updateSubCategory,
    deleteSubCategory,
};
