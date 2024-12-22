import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mysqlDB.js';
import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import employeeRouter from './routes/employeeRoute.js';
import categoryRouter from './routes/categoryRoute.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app config
const app = express();
const port = process.env.PORT || 4000;
connectCloudinary();
connectDB()

//middleware
app.use(express.json());
app.use(cors());

//api endpoints
// user endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// admin endpoints
app.use('/api/employee', employeeRouter);
app.use('/api/category', categoryRouter);

// Admin routes should come before the frontend routes
// Handle admin static files and routing
app.use('/admin', express.static(path.join(__dirname, 'admin_dist/dist')));
app.get('/admin/*', (req, res) => {
    console.log('Admin route hit:', req.path);
    res.sendFile(path.join(__dirname, 'admin_dist/dist', 'index.html'));
});

// Frontend routes
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', (req, res) => {
    if (!req.path.startsWith('/admin')) {
        console.log('Frontend route hit:', req.path);
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));