import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const {token} = req.headers;

    if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userd = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export {authUser};