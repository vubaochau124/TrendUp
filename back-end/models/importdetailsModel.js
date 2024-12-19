import mysql from 'mysql2'
import connectDB from '../config/mysqlDB.js';

const importdetails = async () => {
    try {
        const [result] = await connectDB.query("SELECT * FROM importdetails")
        console.log('Lấy danh sách importdetails thành công!');
        return result; // Trả về kết nối nếu thành công
    } catch (error) {
        console.error('Lỗi không lấy được danh sách importdetails:', error.message);
        throw error; // Quăng lỗi để xử lý ở nơi khác
    }
}

export default importdetails