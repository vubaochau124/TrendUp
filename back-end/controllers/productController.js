import {v2 as cloudinary} from 'cloudinary'
import connectDB from '../config/mysqlDB.js'
import products from '../models/productsModel.js'

// function for add product
const addProduct = async (req, res) => {
    try {
        const {name, description, price, persontype, productstyle, sizes, bestseller} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=>item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )
        const imagesUrl_text = imagesUrl.join(";");
        let bestseller_value = bestseller ? 1 : 0;
        const [product] = await connectDB.query("INSERT INTO products \
            (name, description, price, person_type_name, product_style_name, images, bestseller) \
             VALUES (?, ?, ?, ?, ?, ?, ?);", 
             [name, description, price, persontype, productstyle, imagesUrl_text, bestseller_value])
        
        const list_sizes = JSON.parse(sizes)
        const product_id = product.insertId
        for (let i = 0; i < list_sizes.length; i++) {
            await connectDB.query("INSERT INTO inventory \
                (product_id, size, quantity) \
                 VALUES (?, ?, ?);", [product_id, list_sizes[i], 0])
        }


        console.log(name, description, price, persontype, productstyle, sizes, bestseller)

        res.json({success:true,message:bestseller_value})


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// function for list product
const listProduct = async (req, res) => {
    try {
        const list_products = await products();
        res.json({sucess:true, list_products})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

// function for edit product
const editProduct = async (req, res) => {
    try {
        const {id, name, description, price, persontype, productstyle, sizes, bestseller} = req.body
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
        const imagesUrl_text = imagesUrl.join(";");
        console.log(req.files)
        let bestseller_value = "0"
        if (bestseller === true){
            bestseller_value = "1"
        }
        const [product] = await connectDB.query("UPDATE products \
            SET name = ?, description = ?, price = ?, person_type_name = ?, \
            product_style_name = ?, images = ?, bestseller = ?\
            where product_id = ?;", 
             [name, description, price, persontype, productstyle, imagesUrl_text, bestseller_value, id])
        
        const list_sizes = sizes ? JSON.parse(sizes) : [];
        const [res_sizes] = await connectDB.query("SELECT * FROM Inventory WHERE product_id = ?;", [id])
        let list_sizes_old = []
        for(let i = 0; i < res_sizes.length; i++){
            list_sizes_old.push(res_sizes[i].size)
        }
        for (let i = 0; i < list_sizes.length; i++) {
            if (!list_sizes_old.includes(list_sizes[i])){
                await connectDB.query("INSERT INTO inventory \
                (product_id, size, quantity) \
                 VALUES (?, ?, ?);", [id, list_sizes[i], 0])
            }
        }
        console.log("Câu truy vấn:", `UPDATE products SET name = ?, description = ?, price = ?, person_type_name = ?, product_style_name = ?, images = ?, bestseller = ? WHERE product_id = ?;`);
        console.log("Giá trị tham số:", [name, description, price, persontype, productstyle, imagesUrl_text, bestseller_value, id]);

        res.json({success:true,message:"Product Edited"})


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// function for remove product
const removeProduct = async (req, res) => {
    try {
        await connectDB.query("DELETE FROM products WHERE product_id = ?;", [req.body.id]);
        res.json({sucess:true, message: "Delete product"})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

// function for single product
const singleProduct = async (req, res) => {
    try {
        const [result] = await connectDB.query("SELECT * FROM products WHERE product_id = ?;", [req.body.product_id]);
        res.json({sucess:true, message: result[0]})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

const sizesProduct = async (req, res) => {
    try {
        const [result] = await connectDB.query("SELECT * FROM Inventory WHERE product_id = ?;", [req.body.product_id]);
        res.json({sucess:true, message: result})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

export { listProduct, addProduct, editProduct, removeProduct, singleProduct, sizesProduct}