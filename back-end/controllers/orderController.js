// import orderModel from "../models/orderModel.js"
// import userModel from "../models/userModel.js";

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

}

//User orders data for Frontend
const userOrders = async (req, res) => {

}

//update order status from Admin Panel
const updateStatus = async (req, res) => {

}

export { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus }