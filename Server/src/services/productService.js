const fs = require('fs/promises');
const cloudinary = require('../config/cloudinaryConfig');
const {createProductRepository, getProductByIdRepository, deleteProductByIdRepository} = require('../repositories/productRepository');

async function createProduct(productDetails) {
    // 1. We should check if an image is coming to create the product.. then we should upload the image to cloudinary
    const imagePath = productDetails.imagePath;
    if(imagePath) {
        try { 
            const coudinaryResponse = await cloudinary.uploader.upload(imagePath);
            console.log("cloudinary response", coudinaryResponse);
            var productImage = coudinaryResponse.secure_url;
            console.log(process.cwd() + "/" + imagePath);
            await fs.unlink(process.cwd() + "/" + imagePath); // delete the file from the server after uploading to cloudinary
        } catch (error) {
            console.log(error);
            throw {
                reason: "Product not created",
                statusCode: 500
            }
        }
    }
    // 2. Then use the url from cloudinary to create the product in the database
    const product = await createProductRepository({
        // ...productDetails,
        productName: productDetails.productName,
        description: productDetails.description,
        price: productDetails.price,
        category: productDetails.category,
        inStock: productDetails.inStock,
        productImage: productImage,
        quantity: productDetails.quantity
    })

    if(!product) {
        throw {
            reason: "Product not created no product",
            statusCode: 500
        }
    }

    return product;
}

async function getProductById(productId) {
    const response = await getProductByIdRepository(productId);
    if(!response) {
        throw {
            reason: "Product not found",
            statusCode: 404
        }
    }
    return response;
}

async function deleteProductById(productId) {
    const response = await deleteProductByIdRepository(productId);
    if(!response) {
        throw {
            reason: "Cannot delete product",
            statusCode: 500
        }
    }
    return response;
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}