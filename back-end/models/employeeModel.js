import mysql from 'mysql2'
import connectDB from '../config/mysqlDB.js';

const employees = async () => {
    try {
        const [result] = await connectDB.query("SELECT * FROM employees")
        console.log('Lấy danh sách sản phẩm thành công!');
        return result; // Trả về kết nối nếu thành công
    } catch (error) {
        console.error('Lỗi không lấy được danh sách sản phẩm:', error.message);
        throw error; // Quăng lỗi để xử lý ở nơi khác
    }
}

export default employees