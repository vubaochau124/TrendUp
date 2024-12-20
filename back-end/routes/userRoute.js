import express from 'express';
import {loginEmployee, loginUser, registerEmployee, registerUser} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/employee', loginEmployee)
userRouter.post('/addemployee', registerEmployee)

export default userRouter;
