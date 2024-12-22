import express from 'express';

import { getEmployees, addEmployee, editEmployee, deleteEmployee, getEmployeeById } from '../controllers/employeeController.js';
import adminAuth from '../middleware/adminAuth.js';

const employeeRouter = express.Router();

employeeRouter.get('/list', adminAuth, getEmployees);
employeeRouter.post('/add', adminAuth, addEmployee);
employeeRouter.get('/fetch/:id', adminAuth, getEmployeeById);
employeeRouter.post(`/edit/:id`, adminAuth, editEmployee);
employeeRouter.post('/delete/:id', adminAuth, deleteEmployee);

export default employeeRouter;