import {v2 as cloudinary} from 'cloudinary'
import connectDB from '../config/mysqlDB.js'
import products from '../models/productsModel.js'
import productstyles from '../models/productstylesModel.js'
import persontypes from '../models/persontypesModel.js'

// function for add product
const addStyle = async (req, res) => {
    try {
        const {name, description} = req.body
        const [find] = await connectDB.query("INSERT INTO productstyles (name, description) VALUES (?, ?);", [name, description])

        res.json({sucess:true,message:"Category Added"})

    } catch (error) {
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

// function for list product
const listStyle = async (req, res) => {
    try {
        const list_styles = await productstyles();
        res.json({sucess:true, list_styles})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

// function for edit product
const editStyle = async (req, res) => {
    try {
        const {name, nameProduct, description} = req.body
        const [find] = await connectDB.query("select * from productstyles where name = ?;", [nameProduct])
        console.log(nameProduct)
        if (find.length > 0){
            await connectDB.query("UPDATE productstyles SET description = ? where name = ?;", [description, nameProduct])
        } else {
            await connectDB.query("DELETE FROM persontypes WHERE name = ?;", [name]);
            await connectDB.query("DELETE FROM productstyles WHERE name = ?;", [name]);
            await connectDB.query("INSERT INTO productstyles (name, description) VALUES (?, ?);", [nameProduct, description])
        }
        res.json({sucess:true, message: "Edit " + req.body.nameProduct})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

// function for remove product
const removeStyle = async (req, res) => {
    try {
        await connectDB.query("DELETE FROM productstyles WHERE name = ?;", [req.body.name]);
        res.json({sucess:true, message: "Delete " + req.body.name})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

// function for single product
const singleStyle = async (req, res) => {
    try {
        const [style] = await connectDB.query("SELECT * FROM productstyles WHERE name = ?;", [req.body.name]);
        console.log(style)
        res.json({sucess:true, style})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

const addWearer = async (req, res) => {
    try {
        const {name, description} = req.body

        const [style] = await connectDB.query("INSERT INTO persontypes \
            (name, description) \
             VALUES (?, ?);", 
             [name, description])

        res.json({sucess:true,message:"Category Added"})

    } catch (error) {
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

// function for list product
const listWearer = async (req, res) => {
    try {
        const list_wearer = await persontypes();
        res.json({sucess:true, list_wearer})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

// function for edit product
const editWearer = async (req, res) => {
    try {
        const {name, nameProduct, description} = req.body
        const [find] = await connectDB.query("select * from persontypes where name = ?;", [nameProduct])
        console.log(nameProduct)
        if (find.length > 0){
            await connectDB.query("UPDATE persontypes SET description = ? where name = ?;", [description, nameProduct])
        } else {
            await connectDB.query("DELETE FROM persontypes WHERE name = ?;", [name]);
            await connectDB.query("DELETE FROM productstyles WHERE name = ?;", [name]);
            await connectDB.query("INSERT INTO persontypes (name, description) VALUES (?, ?);", [nameProduct, description])
        }
        res.json({sucess:true, message: "Edit " + req.body.nameProduct})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
    
}

// function for remove product
const removeWearer = async (req, res) => {
    try {
        await connectDB.query("DELETE FROM persontypes WHERE name = ?;", [req.body.name]);
        res.json({sucess:true, message: "Delete " + req.body.name})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

// function for single product
const singleWearer = async (req, res) => {
    try {
        const [wearer] = await connectDB.query("SELECT * FROM persontypes WHERE name = ?;", [req.body.name]);
        res.json({sucess:true, wearer})
        console.log(wearer)
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}
const listProduct = async (req, res) => {
    try {
        const [list_products] = await connectDB.query("SELECT * FROM products WHERE product_style_name = ? OR person_type_name = ?;", [req.body.name, req.body.name]);
        res.json({sucess:true, list_products})
        // console.log("SELECT * FROM products WHERE product_style_name = ? OR person_type_name = ?;", [req.body.name, req.body.name])
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

export { addStyle, addWearer, listStyle, listWearer, editStyle, editWearer, removeStyle, removeWearer, singleStyle, singleWearer, listProduct}