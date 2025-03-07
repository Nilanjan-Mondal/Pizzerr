const express = require('express');
const { addProduct, getProduct, deleteProduct, getAllProducts } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddleware');
const { isAdmin, isLoggedIn } = require('../validation/authValidator');

const productRouter = express.Router();

productRouter.post('/', 
    isLoggedIn,
    isAdmin,
    uploader.single('productImage'),
    addProduct
);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', deleteProduct);

module.exports = productRouter;