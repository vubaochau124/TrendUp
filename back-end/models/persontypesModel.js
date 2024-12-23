import mysql from 'mysql2'
import connectDB from '../config/mysqlDB.js';

const persontypes = async () => {
    try {
        const [result] = await connectDB.query("SELECT * FROM persontypes")
        console.log('Lấy danh sách persontypes thành công!');
        return result; // Trả về kết nối nếu thành công
    } catch (error) {
        console.error('Lỗi không lấy được danh sách persontypes:', error.message);
        throw error; // Quăng lỗi để xử lý ở nơi khác
    }
}

export default persontypes