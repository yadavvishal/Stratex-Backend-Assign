const jwt = require('jsonwebtoken');
const Book = require('../models/Book');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.sendStatus(403);
        }
        next();
    };
};

const authorizeOwnership = (Model) => {
    return async (req, res, next) => {
        try {
            const record = await Model.findOne({ _id: req.params.id, userId: req.user.id });
            if (!record) {
                return res.status(403).json({ error: "You do not have permission to access or modify this resource." });
            }
            req.record = record;
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
};

module.exports = { authenticateToken, authorizeRole, authorizeOwnership };
