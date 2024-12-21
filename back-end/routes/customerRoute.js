import express from 'express';
import { listCustomer, removeCustomer} from '../controllers/customerController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const customerRouter = express.Router();

customerRouter.post('/remove', removeCustomer);
customerRouter.get('/list', listCustomer);

export default customerRouter