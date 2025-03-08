import { useState } from "react";
import { FaCreditCard, FaMoneyBillWave, FaGooglePay, FaTag } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function Checkout() {
    const location = useLocation();
    const { totalAmount } = location.state || {};  // Get the totalAmount passed from Cart page
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [finalPrice, setFinalPrice] = useState(totalAmount || 500); // Default to 500 if no totalAmount is passed

    const coupons = [
        { code: "PIZZA10", discount: 10 },
        { code: "HOT20", discount: 20 },
        { code: "CHEESE30", discount: 30 },
    ];

    const applyCoupon = (coupon) => {
        setSelectedCoupon(coupon);
        setFinalPrice(totalAmount - (totalAmount * coupon.discount) / 100);  // Apply the discount based on the coupon
    };

    return (
        <div className="min-h-screen bg-black relative flex items-center justify-center">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[18rem] h-[18rem] bg-yellow-500 opacity-40 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[18rem] h-[18rem] bg-red-500 opacity-35 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start justify-center gap-8 p-6 w-full max-w-6xl">
                {/* Coupons & Discounts */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 w-full lg:w-1/4">
                    <h2 className="text-2xl font-bold text-white text-center mb-4">Coupons</h2>
                    <div className="flex flex-col space-y-3">
                        {coupons.map((coupon) => (
                            <button
                                key={coupon.code}
                                className={`flex items-center justify-between p-3 rounded-lg transition ${
                                    selectedCoupon?.code === coupon.code ? "bg-yellow-500 text-black" : "bg-black/40 text-white"
                                }`}
                                onClick={() => applyCoupon(coupon)}
                            >
                                <span>{coupon.code} - {coupon.discount}% Off</span>
                                <FaTag size={20} />
                            </button>
                        ))}
                    </div>
                    <p className="text-gray-300 text-center mt-4">
                        Total: 
                        <span className="line-through text-red-400"> ₹{totalAmount}</span>  {/* Strikethrough the original price */}
                        <span className="text-yellow-400"> ₹{finalPrice.toFixed(2)}</span>  {/* Display discounted price */}
                    </p>
                </div>

                {/* Checkout Form */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 w-full lg:w-2/4">
                    <h1 className="text-3xl font-extrabold text-white text-center mb-6">Checkout</h1>
                    <form className="flex flex-col space-y-4">
                        <div>
                            <label className="text-gray-300">Name</label>
                            <input type="text" className="w-full p-2 rounded-lg bg-black/40 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none" />
                        </div>
                        <div>
                            <label className="text-gray-300">Email</label>
                            <input type="email" className="w-full p-2 rounded-lg bg-black/40 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none" />
                        </div>
                        <div>
                            <label className="text-gray-300">Address</label>
                            <input type="text" className="w-full p-2 rounded-lg bg-black/40 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none" />
                        </div>
                        <div>
                            <label className="text-gray-300">Phone</label>
                            <input type="tel" className="w-full p-2 rounded-lg bg-black/40 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none" />
                        </div>
                        <button className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                            Place Order
                        </button>
                    </form>
                </div>

                {/* Payment Method Selection */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 w-full lg:w-1/4">
                    <h2 className="text-2xl font-bold text-white text-center mb-4">Select Payment</h2>
                    <div className="flex flex-col space-y-4">
                        <button
                            className={`flex items-center justify-between p-3 rounded-lg transition ${
                                paymentMethod === "UPI" ? "bg-yellow-500 text-black" : "bg-black/40 text-white"
                            }`}
                            onClick={() => setPaymentMethod("UPI")}
                        >
                            <span>UPI / Google Pay</span>
                            <FaGooglePay size={24} />
                        </button>
                        <button
                            className={`flex items-center justify-between p-3 rounded-lg transition ${
                                paymentMethod === "Card" ? "bg-yellow-500 text-black" : "bg-black/40 text-white"
                            }`}
                            onClick={() => setPaymentMethod("Card")}
                        >
                            <span>Credit / Debit Card</span>
                            <FaCreditCard size={24} />
                        </button>
                        <button
                            className={`flex items-center justify-between p-3 rounded-lg transition ${
                                paymentMethod === "COD" ? "bg-yellow-500 text-black" : "bg-black/40 text-white"
                            }`}
                            onClick={() => setPaymentMethod("COD")}
                        >
                            <span>Cash on Delivery</span>
                            <FaMoneyBillWave size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
