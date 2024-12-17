import mysql from 'mysql2'
import connectDB from '../config/mysqlDB.js';

const orders = async () => {
    try {
        const [result] = await connectDB.query("SELECT * FROM orders")
        console.log('Lấy danh sách orders thành công!');
        return result; // Trả về kết nối nếu thành công
    } catch (error) {
        console.error('Lỗi không lấy được danh sách orders:', error.message);
        throw error; // Quăng lỗi để xử lý ở nơi khác
    }
}

export default orders