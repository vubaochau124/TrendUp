import express from 'express';

import { getEmployees, addEmployee, editEmployee, deleteEmployee, getEmployeeById } from '../controllers/employeeController.js';
import adminAuth from '../middleware/adminAuth.js';

const employeeRouter = express.Router();

employeeRouter.get('/list', getEmployees);
employeeRouter.post('/add', addEmployee);
employeeRouter.get('/fetch/:id', getEmployeeById);
employeeRouter.post(`/edit/:id`, editEmployee);
employeeRouter.post('/delete/:id', deleteEmployee);

export default employeeRouter;