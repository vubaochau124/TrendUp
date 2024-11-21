import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'

//app config
const app = express()
const port = process.env.PORT || 4000
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user',userRouter)

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(port, () => console.log(`Server is running on port ${port}`))