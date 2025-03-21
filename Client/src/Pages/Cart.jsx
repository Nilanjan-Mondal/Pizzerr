import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "@/configs/clientConfig";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/carts`, { withCredentials: true });
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
            const response = await axios.post(`${BaseUrl}/carts/add/${productId}`, {}, { withCredentials: true });
            if (response.data.success) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.product._id === productId ? { ...item, quantity: item.quantity + 1 } : item
                    )
                );
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await axios.post(`${BaseUrl}/carts/rem/${productId}`, {}, { withCredentials: true });
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
        }
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black relative text-white">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[18rem] h-[18rem] bg-yellow-500 opacity-40 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[18rem] h-[18rem] bg-red-500 opacity-35 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
                <h1 className="text-5xl font-extrabold text-center mb-12">
                    Your <span className="text-red-500">Cart</span>
                </h1>

                {cartItems.length === 0 ? (
                    <p className="text-center text-lg font-semibold">Your cart is empty.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105 flex flex-col min-h-[500px] p-4"
                                >
                                    <img
                                        src={item.product.productImage}
                                        alt={item.product.productName}
                                        className="w-full h-48 object-cover rounded-t-2xl"
                                    />

                                    <div className="flex flex-col flex-grow">
                                        <h2 className="text-xl font-semibold text-yellow-400 mt-2">{item.product.productName}</h2>

                                        {/* Description container with proper spacing */}
                                        <div className="flex-grow mt-2 mb-2 overflow-y-auto max-h-[80px] text-sm text-gray-300 custom-scrollbar">
                                            {item.product.description}
                                        </div>

                                        {/* Price is always at the bottom */}
                                        <p className="text-red-400 font-bold text-lg text-center mt-auto">₹{item.product.price}</p>
                                    </div>

                                    {/* Buttons section, always aligned */}
                                    <div className="flex items-center justify-between bg-black/20 p-3 mt-3">
                                        <button
                                            onClick={() => removeFromCart(item.product._id)}
                                            className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                                        >
                                            -
                                        </button>
                                        <p className="text-gray-300 font-semibold">{item.quantity}</p>
                                        <button
                                            onClick={() => addToCart(item.product._id)}
                                            className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                            ))}
                        </div>

                        <div className="mt-12 p-6 bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl shadow-lg text-center max-w-xl mx-auto">
                            <h2 className="text-3xl font-bold text-yellow-400">Total: ₹{totalAmount.toFixed(2)}</h2>
                            {/* <Link to={"/checkout"} >
                                <button
                                    className="mt-4 px-6 py-3 text-lg font-bold bg-red-500 rounded-lg hover:bg-red-600 transition transform hover:scale-105 shadow-lg"
                                >
                                    Order Now
                                </button>
                            </Link> */}

                            <Link to="/checkout" state={{ totalAmount }}>
                                <button
                                    className="mt-4 px-6 py-3 text-lg font-bold bg-red-500 rounded-lg hover:bg-red-600 transition transform hover:scale-105 shadow-lg"
                                >
                                    Order Now
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
