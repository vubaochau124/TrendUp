import expres from 'express'
import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()


//Admin features
orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrder)
orderRouter.post('/razorpay', authUser, placeOrder)

//User Feature
orderRouter.post('userorders', authUser, userOrders)


export default orderRouter