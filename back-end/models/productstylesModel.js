import mysql from 'mysql2'
import connectDB from '../config/mysqlDB.js';

const productstyles = async () => {
    try {
        const [result] = await connectDB.query("SELECT * FROM productstyles")
        console.log('Lấy danh sách productstyles thành công!');
        return result; // Trả về kết nối nếu thành công
    } catch (error) {
        console.error('Lỗi không lấy được danh sách productstyles:', error.message);
        throw error; // Quăng lỗi để xử lý ở nơi khác
    }
}

export default productstyles