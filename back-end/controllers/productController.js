import { v2 as cloudinary } from 'cloudinary';
// import cloudinary from '../config/cloudinaryConfig.js';
import productModel from '../models/productsModel.js'; // Ensure the correct import path

// Function for adding a product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category , subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        console.log(name, description, price, category , subCategory, sizes, bestseller);
        console.log(imagesUrl);

        // Add product to the database
        const newProduct = await productModel.create({
            name,
            description,
            price,
            image: imagesUrl, // Ensure image is stored as JSON
            category,
            subCategory,
            sizes, // Ensure sizes is stored as JSON
            bestseller: bestseller === 'true' ? true : false, // Convert string to boolean
            // date: new Date().getFullYear() // Assuming you want to store the current year
        });

        res.json({ success: true, product: newProduct });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// function for list product
const listProduct = async (req, res) => {

}

// function for edit product
const editProduct = async (req, res) => {

}

// function for remove product
const removeProduct = async (req, res) => {

}

// function for remove product
const singleProduct = async (req, res) => {

}

export { listProduct, addProduct, editProduct, removeProduct, singleProduct}