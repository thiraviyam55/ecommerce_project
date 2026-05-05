const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, 'Unauthorized - No token');
    }

    try {
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // attach user info
        console.log(req.user);
        next();
    } catch (err) {
        throw new ApiError(401, 'Invalid or expired token');
    }
};