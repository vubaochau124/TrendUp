import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mysqlDB.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import employeeRouter from './routes/employeeRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import importRouter from './routes/importRoute.js';

//app config
const app = express();
const port = process.env.PORT || 3000;
connectCloudinary();
connectDB()

//middleware
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

//api endpoints
// user endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);


// admin endpoints
app.use('/api/employee', employeeRouter);
app.use('/api/category', categoryRouter);
app.use('/api/import', importRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));