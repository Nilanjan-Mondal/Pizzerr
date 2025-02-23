const { createProduct, getProductById, deleteProductById } = require("../services/productService");

async function addProduct(req, res) {
    // console.log("req.file :", req.file);
    // console.log("req.file :", req.body);
    try {
        const product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            inStock: req.body.inStock,
            quantity: req.body.quantity,
            imagePath: req.file?.path // contains the path of the image uploaded (eg -> uploads/1737310134715.jpeg)
        });
        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            data: product,
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            message: error.message || "An unexpected error occurred",
            success: false,
            data: {},
            error: error
        })
    }
}

async function getProduct(req, res) {
    try {
        const response = await getProductById(req.params.id);
        return res.status(200).json({
            message: "Successfully retrieved product",
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            message: error.message || "An unexpected error occurred",
            success: false,
            data: {},
            error: error
        })
    }
}

async function deleteProduct(req, res) {
    try {
        const response = await deleteProductById(req.params.id);
        return res.status(200).json({
            message: "Successfully deleted the product",
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            message: error.message || "An unexpected error occurred",
            success: false,
            data: {},
            error: error
        })
    }
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct
}