import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log('No authorization header provided');
            return res.status(401).json({ success: false, message: 'No authorization header provided' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findByPk(decoded.id);

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        req.userId = user.id;
        next();
    } catch (error) {
        console.log('Unauthorized:', error);
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

export { authUser };