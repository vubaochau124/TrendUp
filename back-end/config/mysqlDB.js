import mysql from 'mysql2'
import dotenv from 'dotenv';

dotenv.config(); // Đọc các biến môi trường từ file .env

const connectDB = async () => mysql.createPool({
            host: process.env.MYSQL_HOST,       // Địa chỉ máy chủ MySQL
            user: process.env.MYSQL_USER,            // Tên người dùng (sửa theo tài khoản của bạn)
            port: process.env.MYSQL_PORT,
            password: process.env.MYSQL_PASSWORD, // Mật khẩu
            database: process.env.MYSQL_DATABASE,  // Tên cơ sở dữ liệu
        }).promise()
        
export default connectDB