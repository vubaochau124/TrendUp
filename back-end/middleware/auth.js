import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // Corrected from userd to userId
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export { authUser };