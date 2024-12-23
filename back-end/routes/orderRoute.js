import express from 'express';
import { 
    getAllOrders, 
    updateOrderStatus,
    getOrderById,
    placeOrder, 
    placeOrderPaypal, 
    userOrders, 
    payedPaypal,
    getOrderByStatus,
    getOrdersByPayment
} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import {authUser} from '../middleware/auth.js';

const orderRouter = express.Router();

//admin
orderRouter.get('/orders', getAllOrders);
orderRouter.post('/status', updateOrderStatus);
orderRouter.get('/:id', getOrderById);
orderRouter.get('/orders_status/:status', getOrderByStatus);
orderRouter.get('/payment', getOrdersByPayment);

//payment
orderRouter.post('/paypal', authUser, placeOrderPaypal);
orderRouter.post('/payed-paypal', authUser, payedPaypal);
orderRouter.post('/place', authUser, placeOrder);

//user
orderRouter.get('/user', authUser, userOrders);

export default orderRouter;