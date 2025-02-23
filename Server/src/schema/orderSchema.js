const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['ORDERED', 'CANCELLED', 'DELIVERED', 'OUT_FOR_DELIVERY', 'PROCESSING'],
        default: 'ORDERED'
    },
    address: {
        type: String,
        minLength: [10, "Address must be atleast 10 char long"],
        required: true
    },
    paymenMethod: {
        type: String,
        enum: ['COD', 'CARD'],
        default: 'COD'
    }
},{
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;