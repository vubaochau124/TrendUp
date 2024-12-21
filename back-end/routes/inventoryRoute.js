import express from 'express';
import { listInventory, editInventory, selectInventorybyProduct} from '../controllers/inventoryController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const inventoryRouter = express.Router();


inventoryRouter.post('/edit'  , editInventory);
inventoryRouter.post('/select'  , selectInventorybyProduct);
inventoryRouter.get('/list', listInventory);


export default inventoryRouter