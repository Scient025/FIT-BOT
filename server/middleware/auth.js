import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store the user's info (ID) in req.user
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};

export default authenticateJWT;
