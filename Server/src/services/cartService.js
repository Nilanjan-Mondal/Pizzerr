const { getCartByUserId } = require("../repositories/cartRepository");
const { getProductByIdRepository } = require("../repositories/productRepository");

async function getCart(userId) {
    const cart = await getCartByUserId(userId);
    if(!cart) {
        throw new Error("Cart not found");
    }
    return cart;
}


async function modifyCart(userId, ProductId, shouldAdd = true) {

    const quantityValue = shouldAdd ? 1 : -1;

    const cart = await getCart(userId);
    const product = await getProductByIdRepository(ProductId);
    if(!product) {
        throw new Error("Product not found");
    }
    if(!product.inStock && product.quantity <= 0) {
        throw new Error("Product out of stock");
    }

    // may be the product is already in the cart
    let foundProduct = false;
    cart.items.forEach(item => {
        if(item.product._id == ProductId) {
            if(shouldAdd) {
                if(product.quantity >= item.quantity) {
                    item.quantity += quantityValue;
                } else {
                    throw new Error("The quantity of the item in the cart exceeds the available quantity in stock");
                }
            } else {
                if(item.quantity > 0) {
                    item.quantity += quantityValue;
                } else {
                    throw new Error("The quantity of the item in the cart is already 0");
                }
            }
            
            foundProduct = true;
        }
    });
    if(!foundProduct) {
        if(shouldAdd) {
            cart.items.push({
                product: ProductId,
                quantity: 1
            });
        } else {
            throw new Error("Product not found in the cart");
        }
    }

    await cart.save();

    // product.quantity -= 1;

    // await product.save();

    return cart;
}

//  async function addToCart(userId, ProductId) {
//     const cart = await getCart(userId);
//     const product = await getProductByIdRepository(ProductId);
//     if(!product) {
//         throw new Error("Product not found");
//     }
//     if(!product.inStock && product.quantity <= 0) {
//         throw new Error("Product out of stock");
//     }

//     // may be the product is already in the cart
//     let foundProduct = false;
//     cart.items.forEach(item => {
//         if(item.product._id == ProductId) {
//             if(product.quantity >= item.quantity) {
//                 item.quantity += 1;
//             } else {
//                 throw new Error("The quantity of the item in the cart exceeds the available quantity in stock");
//             }
            
//             foundProduct = true;
//         }
//     });
//     if(!foundProduct) {
//         cart.items.push({
//             product: ProductId,
//             quantity: 1
//         });
//     }

//     await cart.save();

//     // product.quantity -= 1;

//     // await product.save();

//     return cart;
//  }

module.exports = { 
    getCart,
    modifyCart
};