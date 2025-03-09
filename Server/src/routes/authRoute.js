const express = require('express');
const login = require('../controllers/authController');
const { logoutUser } = require('../services/authService');
const verifyToken = require('../middlewares/verifyToken');

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: "This is a protected route." });
});
authRouter.post('/logout', logoutUser);

module.exports = authRouter;