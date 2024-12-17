import mysql from 'mysql2'
import connectDB from '../config/mysqlDB.js';

const sizes = async () => {
    try {
        const [result] = await connectDB.query("SELECT * FROM sizes")
        console.log('Lấy danh sách sizes thành công!:');
        return result; // Trả về kết nối nếu thành công
    } catch (error) {
        console.error('Lỗi không lấy được danh sách sizes:', error.message);
        throw error; // Quăng lỗi để xử lý ở nơi khác
    }
}

export default sizes