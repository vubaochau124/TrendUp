import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

import products from './models/productsModel.js'
import sizes from './models/sizesModel.js'
import users from './models/customersModel.js'
import categotyRouter from './routes/catergoriesRoute.js'
import employeeRouter from './routes/employeeRoute.js'
import customerRouter from './routes/customerRoute.js'
import inventoryRouter from './routes/inventoryRoute.js'
const path = require('path');
//app config
const app = express()
const port = process.env.PORT || 4000

connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/admin', express.static(path.join(__dirname, 'dist')));

app.use('/api/user',userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/categories', categotyRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/customer', customerRouter)
app.use('/api/inventory', inventoryRouter)

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(port, () => console.log(`Server is running on port ${port}`))




