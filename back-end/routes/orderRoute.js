import express from 'express';
import { placeOrder, placeOrderPaypal, allOrders, userOrders, updateStatus } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import {authUser} from '../middleware/auth.js';

const orderRouter = express.Router();

//admin
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status',adminAuth, updateStatus);

//payment
orderRouter.post('/paypal', authUser, placeOrderPaypal);
orderRouter.post('/place', authUser, placeOrder);

//user
orderRouter.get('/user', authUser, userOrders);

export default orderRouter;