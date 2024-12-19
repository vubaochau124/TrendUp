import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connecCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import connectDB from './config/mysqlDB.js';

//app config
const app = express();
const port = process.env.PORT || 4000;
connecCloudinary();
//connectDB()

//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));