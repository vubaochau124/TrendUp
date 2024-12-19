import mysql from 'mysql2'
import connectDB from '../config/mysqlDB.js';

const orderdetails = async () => {
    try {
        const [result] = await connectDB.query("SELECT * FROM orderdetails")
        console.log('Lấy danh sách orderdetails thành công!');
        return result; // Trả về kết nối nếu thành công
    } catch (error) {
        console.error('Lỗi không lấy được danh sách orderdetails:', error.message);
        throw error; // Quăng lỗi để xử lý ở nơi khác
    }
}

export default orderdetails