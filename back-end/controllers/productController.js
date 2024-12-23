import { v2 as cloudinary } from 'cloudinary';
// import cloudinary from '../config/cloudinaryConfig.js';
import productModel from '../models/productsModel.js'; // Ensure the correct import path

// Function for adding a product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

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

        console.log(name, description, price, category, subCategory, sizes, bestseller);
        console.log(imagesUrl);

        // Parse sizes to ensure it's an array of objects with size and quantity
        const parsedSizes = JSON.parse(sizes);
        let formatSizes = []
        for (const s of parsedSizes) {
            formatSizes.push({"size": s, "quantity": 0})
        }

        // Add product to the database
        const newProduct = await productModel.create({
            name,
            description,
            price,
            image: imagesUrl, // Ensure image is stored as JSON
            category,
            subCategory,
            sizes: formatSizes, // Store sizes as an array of objects
            bestseller: bestseller === 'true' ? true : false, // Convert string to boolean
        });

        res.json({ success: true, product: newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// function for list product
const listProduct = async (req, res) => {
    try {
        const products = await productModel.findAll();
        res.json({ success: true, products});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for edit product
const editProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log(req.params)
        
        const { name, description, price, category, subCategory, sizes, oldSizes, bestseller } = req.body;
        
        // Parse sizes to ensure it's an array of objects with size and quantity
        // const parsedSizes = JSON.parse(sizes);
        const image1 = req.files && req.files.image1 ? req.files.image1[0] : req.body.image1; // Nếu là tệp tin thì lấy từ req.files, nếu là chuỗi thì lấy từ req.body
        const image2 = req.files && req.files.image2 ? req.files.image2[0] : req.body.image2;
        const image3 = req.files && req.files.image3 ? req.files.image3[0] : req.body.image3;
        const image4 = req.files && req.files.image4 ? req.files.image4[0] : req.body.image4;
        let images = [image1, image2, image3, image4].filter((item)=>item !== undefined)
        
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
              if (typeof item === 'string') {
                // Nếu là chuỗi, giả sử đây là URL của hình ảnh, bạn có thể bỏ qua bước upload hoặc xử lý tùy nhu cầu
                return item;
              } else {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
              }
            })
          );
        console.log(imagesUrl);
        const parsedSizes = JSON.parse(sizes);
        const oldSizes2 = JSON.parse(oldSizes)
        let formatSizes = [];
        let UnchangeSize = [];
        console.log(oldSizes2.length)
        for (let i = 0; i < oldSizes2.length; i++) {
            UnchangeSize.push(oldSizes2[i].size)
        }
        console.log(UnchangeSize, parsedSizes, oldSizes2)
        for (const s of parsedSizes) {
            if (UnchangeSize.includes(s)){
                const i = UnchangeSize.indexOf(s)
                formatSizes.push({"size": s, "quantity":oldSizes2[i].quantity})
            } else {
                formatSizes.push({"size": s, "quantity":0})
            }
        }
        console.log(formatSizes)
        const updatedProduct = await productModel.update(
            {
                name,
                description,
                price,
                image: imagesUrl, // Ensure image is stored as JSON
                category,
                subCategory,
                sizes: formatSizes, //: parsedSizes, // Store sizes as an array of objects
                bestseller: bestseller === 'true' ? true : false // Convert string to boolean
            },
            {
                where: { id: productId }
            }
        );

        if (updatedProduct) {
            res.json({ success: true, message: 'Product has been updated' });
        } else {
            res.json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// function for remove product
const removeProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findOne({
            where: { id: productId }
        });

        // delete images from cloudinary
        product.image.forEach(async (item) => {
            const publicId = item.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        });

        const result = await productModel.destroy({
            where: { id: productId }
        });

        if (result) {
            res.json({ success: true, message: 'Product has been removed' });
        } else {
            res.json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for remove product
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.json({ success: false, message: 'Product ID is required' });
        }

        const product = await productModel.findOne({
            where: { id: productId }
        });

        if (product) {
            res.json({ success: true, product });
        } else {
            res.json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
const getProductByType = async (req, res) => {
    try {
        const categoryId = req.params.category_name;
        if (!categoryId) {
            return res.json({ success: false, message: 'Product ID is required' });
        }

        let product = await productModel.findAll({
            where: { category: categoryId }
        });
        if (product.length === 0){
            product = await productModel.findAll({
                where: { subCategory: categoryId}});
        }
        if (product) {
            res.json({ success: true, product });
        } else {
            res.json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const editInventory = async (req, res) => {
    try {
        const productId = req.params.product_id
        const {formatSizes} = req.body
        const parsedSizes = formatSizes;
        const product = await productModel.update(
            {
                sizes: parsedSizes, // Đảm bảo đây là dữ liệu hợp lệ, ví dụ: array hoặc JSON
            },
            {
                where: { id: productId }, // Điều kiện tìm kiếm sản phẩm
            }
        );
        if (product) {
            res.json({ success: true, product });
        } else {
            res.json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
export { listProduct, addProduct, editProduct, removeProduct, getProductById, getProductByType, editInventory}