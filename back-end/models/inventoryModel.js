import mysql from 'mysql2'
import connectDB from '../config/mysqlDB.js';

const inventory = async () => {
    try {
        const [result] = await connectDB.query("SELECT * FROM inventory")
        console.log('Lấy danh sách inventory thành công!');
        return result; // Trả về kết nối nếu thành công
    } catch (error) {
        console.error('Lỗi không lấy được danh sách inventory:', error.message);
        throw error; // Quăng lỗi để xử lý ở nơi khác
    }
}

export default inventory