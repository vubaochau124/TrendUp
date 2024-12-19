import mysql from 'mysql2'
import connectDB from '../config/mysqlDB.js';

const importorders = async () => {
    try {
        const [result] = await connectDB.query("SELECT * FROM importorders")
        console.log('Lấy danh sách importorders thành công!');
        return result; // Trả về kết nối nếu thành công
    } catch (error) {
        console.error('Lỗi không lấy được danh sách importorders:', error.message);
        throw error; // Quăng lỗi để xử lý ở nơi khác
    }
}

export default importorders