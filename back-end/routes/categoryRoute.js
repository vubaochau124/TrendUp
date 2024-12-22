import express from 'express';

import { getCategory, addCategory, editCategory, deleteCategory, getCategoryById, getCategoryType} from '../controllers/categoryController.js';
import adminAuth from '../middleware/adminAuth.js';

const categoryRouter = express.Router();

categoryRouter.get('/list', getCategory);
categoryRouter.post('/add', addCategory);
categoryRouter.get('/type/:type', getCategoryType);
categoryRouter.get('/fetch/:id', getCategoryById);
categoryRouter.post(`/edit/:id`, editCategory);
categoryRouter.post('/delete/:id', deleteCategory);

export default categoryRouter;