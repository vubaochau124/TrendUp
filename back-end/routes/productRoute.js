import express from 'express';
import { listProduct, addProduct, editProduct, removeProduct, singleProduct, sizesProduct} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add' ,upload.fields([{name: "image1", maxCount: 1}, {name: "image2", maxCount: 1}, {name: "image3", maxCount: 1}, {name: "image4", maxCount: 1}]), addProduct);
productRouter.post('/remove', removeProduct);
productRouter.post('/edit'  ,upload.fields([{name: "image1", maxCount: 1}, {name: "image2", maxCount: 1}, {name: "image3", maxCount: 1}, {name: "image4", maxCount: 1}]), editProduct);
productRouter.get('/list', listProduct);
productRouter.post('/single', singleProduct);
productRouter.post('/sizes', sizesProduct);

export default productRouter