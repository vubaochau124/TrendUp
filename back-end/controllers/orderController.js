// import orderModel from "../models/orderModel.js"
// import userModel from "../models/userModel.js";

import connectDB from "../config/mysqlDB.js"
import orderdetails from "../models/orderdetailsModel.js"
import orders from "../models/ordersModel.js"

//Placing orders using COD method
const placeOrder = async (req, res) => {

// try {
//     const {userId, items, amount, address} = req.body;

//     const orderData = {
//         userId,
//         items,
//         address,
//         amount,
//         PaymentMethod: "COD",
//         payment: false,
//         date: Date.now()
//     }

//     const newOrder = new orderModel(orderData)
//     await newOrder.save()

//     await userModel.findByIdAndUpdate(userId, {cartData:{}})

//     res.json({success:true, message:"Order Placed"})

// } catch (error) {
//     console.log(error)
//     res.json({success:false, message:error.message})
// }

}

//Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {

}

//Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {

}

//All orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const list_order = await orders()
        // console.log(list_order)
        res.json({success:true, message:list_order})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const allOrderDetails = async (req, res) => {
    try {
        const list_order = await orderdetails()
        // console.log(list_order)
        res.json({success:true, message:list_order})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const totalPrice = async (req, res) => {
    try {
        const list_orders = await orders();
        const list_orderDetails = await orderdetails();
        
        let total = {}
        for (const o of list_orders){
            total[o.order_id] = 0
        }
        for (const od of list_orderDetails){
            const [price] = await connectDB.query("SELECT price FROM products WHERE product_id = ?;", [od.product_id])
            console.log(price)
            total[od.order_id] += parseFloat(price[0].price)
        }
        res.json({success:true, message:total})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
//User orders data for Frontend
const userOrders = async (req, res) => {

}

//update order status from Admin Panel
const updateStatus = async (req, res) => {

}

export { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, allOrderDetails,totalPrice}