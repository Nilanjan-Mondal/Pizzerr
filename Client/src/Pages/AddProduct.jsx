import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import { BaseUrl } from "@/configs/clientConfig";

export default function AddProduct() {
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState(null); // State to store the selected file

    const [formData, setFormData] = useState({
        productName: "",
        description: "",
        quantity: "",
        price: "",
        category: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setFileName(file ? file.name : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${BaseUrl}/products/`;

        const data = new FormData();
        data.append("productName", formData.productName);
        data.append("description", formData.description);
        data.append("quantity", formData.quantity);
        data.append("price", formData.price);
        data.append("category", formData.category);
        if (file) {
            data.append("productImage", file);
        }

        try {
            const response = await axios.post(url, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log(response);

            if (response.data.success) {
                alert("Product added successfully!");
                // Reset form fields
                setFormData({
                    productName: "",
                    description: "",
                    quantity: "",
                    price: "",
                    category: ""
                });
                setFile(null);
                setFileName("");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden relative">
            
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Yellow Glow at Top-Right */}
                <div className="absolute top-0 right-0 w-[18rem] h-[18rem] bg-yellow-500 opacity-40 rounded-full blur-[120px]"></div>

                {/* Red Glow at Bottom-Left */}
                <div className="absolute bottom-0 left-0 w-[18rem] h-[18rem] bg-red-500 opacity-35 rounded-full blur-[100px]"></div>
            </div>

            {/* Header */}
            <div className="text-white py-10 w-full text-center relative z-10">
                <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
                    Add Product
                </h1>
            </div>

            {/* Form Container */}
            <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <form onSubmit={handleSubmit} className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-600">
                    
                    {/* Product Name */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                            placeholder="Enter product name"
                        />
                    </div>

                    {/* Product Category */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Product Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                            placeholder="Enter product category"
                        />
                    </div>

                    {/* Product Description */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Product Description
                        </label>
                        <textarea
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                            placeholder="Enter product description"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Product Price */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Product Price (₹)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                            placeholder="Enter product price"
                        />
                    </div>

                    {/* Product Quantity */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Product Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                            placeholder="Enter product quantity"
                        />
                    </div>

                    {/* Product Image Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Product Image
                        </label>
                        <div className="relative w-full border border-gray-600 bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                            <span className="text-gray-400 text-sm">
                                {fileName || "No file chosen"}
                            </span>
                            <label
                                className="cursor-pointer flex items-center bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
                            >
                                <FiUpload className="mr-2" />
                                Upload
                                <input
                                    type="file"
                                    name="productImage"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-300 ease-in-out"
                    >
                        Add Product
                    </button>
                </form>
            </div>

            {/* Footer */}
            <div className="text-gray-400 text-sm text-center py-6 relative z-10">
                <p>&copy; 2025 Pizzer. All rights reserved.</p>
            </div>
        </div>
    );
}