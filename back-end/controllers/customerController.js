import {v2 as cloudinary} from 'cloudinary'
import connectDB from '../config/mysqlDB.js'
import customers from '../models/customersModel.js';


const listCustomer = async (req, res) => {
    try {
        const list_customers = await customers();
        res.json({sucess:true, message: list_customers})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}


const removeCustomer = async (req, res) => {
    try {
        await connectDB.query("DELETE FROM customers WHERE customer_id = ?;", [req.body.id]);
        res.json({sucess:true, message: "Delete customer"})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}



export { listCustomer, removeCustomer}