const express = require('express');
const { getCartByUser, modifyProductToCart } = require('../controllers/cartController.js');
const { isLoggedIn } = require('../validation/authValidator.js');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, getCartByUser);

cartRouter.post('/:operation/:productId', isLoggedIn, modifyProductToCart);

module.exports = cartRouter;