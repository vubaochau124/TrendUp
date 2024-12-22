import categoryModel from "../models/categoryModel.js";

import { Op } from 'sequelize';

// Get all categories
const getCategory = async (req, res) => {
    try {
        const categories = await categoryModel.findAll();
        res.json({ success: true, categories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getCategoryType = async (req, res) => {
    try {
        const { type } = req.params;
        const categories = await categoryModel.findAll({ where: { type: type } });
        res.json({ success: true, categories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// Add an category
const addCategory = async (req, res) => {
    try {
        const { name, description, type } = req.body;

        const category = await categoryModel.create({ name, description, type });

        res.json({ success: true, message: "Category added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// fetch an category info
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const category = await categoryModel.findOne({ where: { category_id: id } });

        res.json({ success: true, message: category });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// edit an category info
const editCategory = async (req, res) => {
    try {
        // const { id } = req.params;
        const { category_id, name, description, type } = req.body;

        await categoryModel.update({name, description, type}, { where: { category_id } });

        res.json({ success: true, message: "Category updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// delete an category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await categoryModel.destroy({ where: { category_id: id } });

        res.json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { getCategory, addCategory, editCategory, deleteCategory, getCategoryById, getCategoryType };