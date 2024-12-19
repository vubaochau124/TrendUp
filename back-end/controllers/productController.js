import {v2 as cloudinary} from 'cloudinary'
import connectDB from '../config/mysqlDB.js'
import products from '../models/productsModel.js'

// function for add product
const addProduct = async (req, res) => {
    try {
        const {name, description, price, persontype, productstyle, sized, bestseller} = req.body

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
        console.log(req.files)
        let bestseller_value = "0"
        if (bestseller === true){
            bestseller_value = "1"
        }
        const [product] = await connectDB.query("INSERT INTO products \
            (name, description, price, person_type_name, product_style_name, images, bestseller) \
             VALUES (?, ?, ?, ?, ?, ?, ?);", 
             [name, description, price, persontype, productstyle, imagesUrl_text, bestseller_value])
        
        const list_sizes = JSON.parse(sized)
        const product_id = product.insertId
        for (let i = 0; i < list_sizes.length; i++) {
            await connectDB.query("INSERT INTO inventory \
                (product_id, size, quantity) \
                 VALUES (?, ?, ?);", [product_id, list_sizes[i], 0])
        }


        console.log(name, description, price, persontype, productstyle, sized, bestseller)

        res.json({sucess:true,message:"Product Added"})


    } catch (error) {
        console.log(error)
        res.json({sucess:false, message:error.message})
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

}

// function for remove product
const removeProduct = async (req, res) => {
    try {
        connectDB.query("DELETE FROM products WHERE product_id = ?;", [req.body.id]);
        res.json({sucess:true, message: req.body.id})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

// function for single product
const singleProduct = async (req, res) => {
    try {
        connectDB.query("SELECT * FROM products WHERE product_id = ?;", [req.body.id]);
        res.json({sucess:true, message: req.body.id})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

export { listProduct, addProduct, editProduct, removeProduct, singleProduct}