const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        minLength: [5, "Product name should be at least 5 characters long"],
        trim: true
    },
    description: {
        type: String,
        minLength: [10, "Product description should be at least 10 characters long"],
    },
    productImage: {
        type: String,
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
        default: 10
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [1, "Product price should be at least 1"]
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
        enum: ["veg", "non-veg", "drinks", "sides"],
        default: "veg"
    },
    inStock: {
        type: Boolean,
        required: [true, "Product stock is required"],
        default: true
    }

}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema); // Product is the name of the collection in the database

module.exports = {
    Product
};