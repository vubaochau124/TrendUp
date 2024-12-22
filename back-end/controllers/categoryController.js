import { v2 as cloudinary } from 'cloudinary';
import categoryModel from '../models/categoryModel.js';
import subCategoryModel from '../models/subCategoryModel.js';

const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.json({ success: false, message: 'All fields are required' });
        }

        const category = await categoryModel.create({
            name,
            description
        });

        if (category) {
            res.json({ success: true, category });
        } else {
            res.json({ success: false, message: 'Unable to create category' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const editCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name, description } = req.body;
        if (!name || !description) {
            return res.json({ success: false, message: 'All fields are required' });
        }

        const category = await categoryModel.findOne({
            where: { id: categoryId }
        });

        if (category) {
            category.name = name;
            category.description = description;
            await category.save();
            res.json({ success: true, category });
        } else {
            res.json({ success: false, message: 'Category not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryModel.findOne({
            where: { id: categoryId }
        });

        if (category) {
            await category.destroy();
            res.json({ success: true, message: 'Category has been removed' });
        } else {
            res.json({ success: false, message: 'Category not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.findAll();
        res.json({ success: true, categories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.json({ success: false, message: 'Category ID is required' });
        }
        console.log(categoryId);
        const category = await categoryModel.findOne({
            where: { id: categoryId }
        });

        if (category) {
            res.json({ success: true, category });
        } else {
            res.json({ success: false, message: 'Category not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// SUB CATEGORY
const addSubCategory = async (req, res) => {
    try {
        const { subForm, category_id } = req.body;
        if (!subForm.name || !subForm.description || !category_id) {
            return res.json({ success: false, message: 'All fields are required' });
        }

        const subCategory = await subCategoryModel.create({
            name: subForm.name,
            description: subForm.description,
            category_id
        });

        if (subCategory) {
            res.json({ success: true, subCategory });
        } else {
            res.json({ success: false, message: 'Unable to create sub category' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const editSubCategory = async (req, res) => {
    try {
        const subCategoryId = req.params.id;
        const { name, description } = req.body;
        if (!name || !description) {
            return res.json({ success: false, message: 'All fields are required' });
        }

        const subCategory = await subCategoryModel.findOne({
            where: { id: subCategoryId }
        });

        if (subCategory) {
            subCategory.name = name;
            subCategory.description = description;
            await subCategory.save();
            res.json({ success: true, subCategory });
        } else {
            res.json({ success: false, message: 'Sub Category not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const deleteSubCategory = async (req, res) => {
    try {
        const subCategoryId = req.params.id;
        const subCategory = await subCategoryModel.findOne({
            where: { id: subCategoryId }
        });

        if (subCategory) {
            await subCategory.destroy();
            res.json({ success: true, message: 'Sub Category has been removed' });
        } else {
            res.json({ success: false, message: 'Sub Category not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const getSubCategoriesByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.json({ success: false, message: 'Category ID is required' });
        }

        const subCategories = await subCategoryModel.findAll({
            where: { category_id: categoryId }
        });

        res.json({ success: true, subCategories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { 
    addCategory, editCategory, deleteCategory, getCategories, getCategoryById,
    addSubCategory, editSubCategory, deleteSubCategory, getSubCategoriesByCategoryId
};
