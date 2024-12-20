import express from 'express';
import { listEmployee, addEmployee, editEmployee, removeEmployee, singleEmployee} from '../controllers/employeeController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const employeeRouter = express.Router();

employeeRouter.post('/add', addEmployee);
employeeRouter.post('/remove', removeEmployee);
employeeRouter.post('/edit'  , editEmployee);
employeeRouter.get('/list', listEmployee);
employeeRouter.post('/single', singleEmployee);

export default employeeRouter