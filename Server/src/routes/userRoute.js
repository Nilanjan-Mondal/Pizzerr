const express = require('express');
const { createUser, getUser } = require('../controllers/userController.js');

const userRouter = express.Router();

userRouter.post('/create', createUser);
userRouter.get('/get-user/:email/:mobileNumber', getUser);

module.exports = userRouter;