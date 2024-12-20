import express from 'express'
import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, allOrderDetails, totalPrice} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()


//Admin features
orderRouter.get('/list', allOrders)
orderRouter.post('/status', updateStatus)
orderRouter.get('/detail', allOrderDetails)
orderRouter.get('/totalprice', totalPrice)


// // Payment Features
// orderRouter.post('/place', authUser, placeOrder)
// orderRouter.post('/stripe', authUser, placeOrder)
// orderRouter.post('/razorpay', authUser, placeOrder)

// //User Feature
// orderRouter.post('userorders', authUser, userOrders)


export default orderRouter