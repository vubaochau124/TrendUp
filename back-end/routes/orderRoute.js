import express from 'express';
import { 
    getAllOrders, 
    updateOrderStatus,
    getOrderById,
    placeOrder, 
    placeOrderPaypal, 
    userOrders, 
} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import { authUser } from '../middleware/auth.js';

const orderRouter = express.Router();

//admin
orderRouter.get('/orders', getAllOrders);
orderRouter.post('/status', updateOrderStatus);
orderRouter.get('/:id', getOrderById);

//payment
orderRouter.post('/paypal', authUser, placeOrderPaypal);
orderRouter.post('/place', authUser, placeOrder);

//user
orderRouter.get('/user', authUser, userOrders);

export default orderRouter;