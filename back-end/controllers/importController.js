import { v2 as cloudinary } from 'cloudinary';
// import cloudinary from '../config/cloudinaryConfig.js';
import importModel from '../models/importModel.js'; // Ensure the correct import path

const addImport = async (req, res) => {
    try {
        console.log(req.body);  // Kiểm tra xem req.body có thông tin như date và amount hay không
        console.log(req.file);  // Kiểm tra file gửi lên

        const { date, amount } = req.body;
        const file1 = req.file;  // Lấy file1 từ req.file, vì bạn chỉ gửi một file
        console.log(file1)
        if (!file1) {
            return res.status(400).json({ success: false, message: 'File is required' });
        }

        // Upload file lên Cloudinary
        let result = await cloudinary.uploader.upload(file1.path, { resource_type: 'auto' });
        console.log(result)
        // Lưu thông tin vào database
        const newImport = await importModel.create({
            date,
            amount,
            receipt: result.secure_url, // Lưu URL file đã được upload
        });

        res.json({ success: true, messange: newImport });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const listImport = async (req, res) => {
    try {
        const imports = await importModel.findAll();
        res.json({ success: true, imports});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {addImport, listImport}