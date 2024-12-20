import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';

dotenv.config(); // Đọc các biến môi trường từ file .env

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

export default connectCloudinary