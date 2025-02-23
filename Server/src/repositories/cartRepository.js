const Cart = require("../schema/cartSchema")

async function createCart(userId) {
    try {
        const newCart = await Cart.create({
            user: userId,
        });
        return newCart;
    } catch (error) {
        throw error;
    }
}

async function getCartByUserId(userId) {
    try {
        const cart = await Cart.findOne({ 
            user: userId 
        }).populate("items.product"); // we were only getting the product id, now we are getting the whole product object because of populate without this cart was returning only product id but now it will return the whole product object, in the cartschema we have product ref to Product, so the whole Product object will be returned (this is mongoose join operation)
        return cart;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createCart,
    getCartByUserId
}