import mysql from 'mysql2'
import connectDB from '../config/mysqlDB.js';

const shoppingcart = async () => {
    try {
        const [result] = await connectDB.query("SELECT * FROM shoppingcart")
        console.log('Lấy danh sách shoppingcart thành công!');
        return result; // Trả về kết nối nếu thành công
    } catch (error) {
        console.error('Lỗi không lấy được danh sách shoppingcart:', error.message);
        throw error; // Quăng lỗi để xử lý ở nơi khác
    }
}

export default shoppingcart