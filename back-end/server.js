import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connecCloudinary from './config/cloudinary.js'
import products from './models/productsModel.js'
import sizes from './models/sizesModel.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import users from './models/customersModel.js'


//app config
const app = express()
const port = process.env.PORT || 4000
connecCloudinary()

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(port, () => console.log(`Server is running on port ${port}`))



// async function getNotes() {
//     const [result] = await pool.query("SELECT * FROM Sizes")
//     return result
// }

// const notes = await getNotes()

// console.log(notes)

