import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Menu() {
    const [products, setProducts] = useState([]);
    const [groupedProducts, setGroupedProducts] = useState({});
    const [cart, setCart] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3500/products/");
                const products = response.data.data;
                setProducts(products);

                // Group products by category
                const grouped = products.reduce((acc, product) => {
                    const category = product.category;
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(product);
                    return acc;
                }, {});
                setGroupedProducts(grouped);
            } catch (error) {
                console.error("Error fetching products:", error.response?.data || error.message);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (product) => {
        try {
            const response = await axios.post(`http://localhost:3500/carts/add/${product._id}`, {}, { withCredentials: true });
            if (response.data.success) {
                alert("Added to cart!");
                setCart((prevCart) => {
                    const newCart = { ...prevCart };
                    if (newCart[product._id]) {
                        newCart[product._id].quantity += 1;
                    } else {
                        newCart[product._id] = { ...product, quantity: 1 };
                    }
                    return newCart;
                });
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
            console.error("Error adding to cart:", error.response?.data || error.message);
        }
    };

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
                    Our <span className="text-red-500">Menu</span>
                </h1>

                {Object.keys(groupedProducts).map((category) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-3xl font-semibold text-orange-400 mb-6">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {groupedProducts[category].map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
                                >
                                    <img
                                        src={product.productImage}
                                        alt={product.productName}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4 text-white">
                                        <h2 className="text-xl font-bold mb-2 text-yellow-400">
                                            {product.productName}
                                        </h2>
                                        <p className="text-gray-300 mb-2">{product.description}</p>
                                        <p className="text-red-400 font-bold text-lg mb-2">
                                            ₹{product.price}
                                        </p>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="mt-4 flex items-center justify-center bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition"
                                        >
                                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}