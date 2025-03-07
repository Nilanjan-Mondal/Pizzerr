import { useState, useEffect } from "react";
import axios from "axios";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("http://localhost:3500/carts", { withCredentials: true });
                setCartItems(response.data.data.items);
            } catch (error) {
                console.error("Error fetching cart items:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const addToCart = async (productId) => {
        try {
            const response = await axios.post(`http://localhost:3500/carts/add/${productId}`, {}, { withCredentials: true });
            if (response.data.success) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.product._id === productId ? { ...item, quantity: item.quantity + 1 } : item
                    )
                );
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
            console.error("Error adding to cart:", error.response?.data || error.message);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await axios.post(`http://localhost:3500/carts/rem/${productId}`, {}, { withCredentials: true });
            if (response.data.success) {
                setCartItems((prevItems) =>
                    prevItems
                        .map((item) =>
                            item.product._id === productId ? { ...item, quantity: item.quantity - 1 } : item
                        )
                        .filter((item) => item.quantity > 0)
                );
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
            console.error("Error removing from cart:", error.response?.data || error.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black relative">
                <div className="absolute inset-0 overflow-hidden">
                    {/* Yellow Glow at Top-Right */}
                    <div className="absolute top-0 right-0 w-[18rem] h-[18rem] bg-yellow-500 opacity-40 rounded-full blur-[120px]"></div>
                    {/* Red Glow at Bottom-Left */}
                    <div className="absolute bottom-0 left-0 w-[18rem] h-[18rem] bg-red-500 opacity-35 rounded-full blur-[100px]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black relative">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Yellow Glow at Top-Right */}
                <div className="absolute top-0 right-0 w-[18rem] h-[18rem] bg-yellow-500 opacity-40 rounded-full blur-[120px]"></div>
                {/* Red Glow at Bottom-Left */}
                <div className="absolute bottom-0 left-0 w-[18rem] h-[18rem] bg-red-500 opacity-35 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
                <h1 className="text-5xl font-extrabold text-center text-white mb-12">
                    Your <span className="text-red-500">Cart</span>
                </h1>

                {cartItems.length === 0 ? (
                    <p className="text-center text-white text-lg font-semibold">Your cart is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
                            >
                                <img
                                    src={item.product.productImage}
                                    alt={item.product.productName}
                                    className="w-full h-48 object-cover rounded-t-2xl"
                                />
                                <div className="p-4 text-white">
                                    <h2 className="text-2xl font-bold mb-2 text-yellow-400">
                                        {item.product.productName}
                                    </h2>
                                    <p className="text-gray-300 mb-2">{item.product.description}</p>
                                    <p className="text-red-400 font-bold text-lg mb-2">
                                        ₹{item.product.price}
                                    </p>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => removeFromCart(item.product._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                                        >
                                            -
                                        </button>
                                        <p className="text-gray-300 font-semibold mx-4">Quantity: {item.quantity}</p>
                                        <button
                                            onClick={() => addToCart(item.product._id)}
                                            className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}