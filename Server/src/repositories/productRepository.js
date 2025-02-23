const { Product } = require("../schema/productSchema");

async function createProductRepository (productDetails) {
    try {
        const response = await Product.create(productDetails);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function getProductByIdRepository(productId) {
    try {
        const product = await Product.findById(productId);
        return product;
    } catch (error) {
        console.log(error);
    }
}

async function deleteProductByIdRepository(productId) {
    try {
        const product = await Product.findByIdAndDelete(productId);
        return true;
    } catch (error) {
        console.log(error);
    }       
}

module.exports = {
    createProductRepository,
    getProductByIdRepository,
    deleteProductByIdRepository
}