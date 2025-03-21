import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { BaseUrl } from "@/configs/clientConfig";

export default function Menu() {
    const [products, setProducts] = useState([]);
    const [groupedProducts, setGroupedProducts] = useState({});
    const [cart, setCart] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/products/`);
                const products = response.data.data;
                setProducts(products);
                groupProducts(products);
            } catch (error) {
                console.error("Error fetching products:", error.response?.data || error.message);
            }
        };

        fetchProducts();
    }, []);

    const groupProducts = (products) => {
        const grouped = products.reduce((acc, product) => {
            const category = product.category;
            if (!acc[category]) acc[category] = [];
            acc[category].push(product);
            return acc;
        }, {});
        setGroupedProducts(grouped);
    };

    const addToCart = async (product) => {
        try {
            const response = await axios.post(`${BaseUrl}/carts/add/${product._id}`, {}, { withCredentials: true });
            if (response.data.success) {
                alert("Added to cart!");
                setCart((prevCart) => {
                    const newCart = { ...prevCart };
                    newCart[product._id] = newCart[product._id] ? { ...newCart[product._id], quantity: newCart[product._id].quantity + 1 } : { ...product, quantity: 1 };
                    return newCart;
                });
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
            console.error("Error adding to cart:", error.response?.data || error.message);
        }
    };

    const filteredProducts = searchQuery
        ? products.filter((product) =>
              product.productName.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : products;

    const groupedFilteredProducts = filteredProducts.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-black relative">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[12rem] h-[12rem] md:w-[18rem] md:h-[18rem] bg-yellow-500 opacity-40 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-[12rem] h-[12rem] md:w-[18rem] md:h-[18rem] bg-red-500 opacity-35 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-8">
                    Our <span className="text-red-500">Menu</span>
                </h1>

                {/* Search Bar */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Search for a pizza..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-3 pl-10 pr-4 text-white bg-black/40 border border-white/20 rounded-lg shadow-md focus:outline-none focus:border-yellow-500"
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>

                {/* Menu Items */}
                {Object.keys(groupedFilteredProducts).length === 0 ? (
                    <p className="text-center text-gray-300">No items match your search.</p>
                ) : (
                    Object.keys(groupedFilteredProducts).map((category) => (
                        <div key={category} className="mb-12">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-orange-400 mb-6">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {groupedFilteredProducts[category].map((product) => (
                                    <div
                                        key={product._id}
                                        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105 flex flex-col"
                                    >
                                        {/* Product Image */}
                                        <img
                                            src={product.productImage}
                                            alt={product.productName}
                                            className="w-full h-48 object-cover"
                                        />

                                        {/* Content */}
                                        <div className="p-4 text-white flex flex-col flex-grow">
                                            <h2 className="text-lg sm:text-xl font-bold text-yellow-400">
                                                {product.productName}
                                            </h2>
                                            <p className="text-gray-300 text-sm sm:text-base flex-grow overflow-hidden">
                                                {product.description}
                                            </p>

                                            {/* Price & Button */}
                                            <div className="flex justify-between items-center mt-4">
                                                <p className="text-red-400 font-bold text-lg">
                                                    ₹{product.price}
                                                </p>
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="flex items-center bg-yellow-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-yellow-700 transition whitespace-nowrap"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                                    <span className="text-sm sm:text-base">Add to Cart</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
