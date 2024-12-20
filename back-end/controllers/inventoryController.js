import {v2 as cloudinary} from 'cloudinary'
import connectDB from '../config/mysqlDB.js'
import inventory from '../models/inventoryModel.js'



const listInventory = async (req, res) => {
    try {
        const list_inventory = await inventory();
        res.json({sucess:true, message: list_inventory})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

const editInventory = async (req, res) => {
    try {
        const {product_id, size, quantity} = req.body
        const [product] = await connectDB.query("UPDATE inventory \
            SET quantity = ? where product_id = ? and size = ?;", 
             [quantity, product_id, size])
        res.json({sucess:true, message: "Edited"})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

const selectInventorybyProduct = async(req,res) => {
    try {
        const {product_id} = req.body
        const [product] = await connectDB.query("select * from inventory where product_id = ?;", 
             [product_id])
        let list_inventory = {}
        list_inventory["S"] = 0
        list_inventory["M"] = 0
        list_inventory["L"] = 0
        list_inventory["XL"] = 0
        list_inventory["XXL"] = 0
        list_inventory["total"] = 0
        for (const p of product){
            list_inventory[p] = p.quantity
            list_inventory["total"] += parseFloat(p.quantity)
        }
       
        res.json({sucess:true, message: list_inventory})
    } catch (error){
        console.log(error)
        res.json({sucess:false, message:error.message})
    }
}

export { listInventory, editInventory, selectInventorybyProduct }