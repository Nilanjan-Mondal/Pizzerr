import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl } from "@/configs/clientConfig";

export default function AuthPage({ onAuth }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    role: "USER",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp
      ? `${BaseUrl}/user/create/`
      : `${BaseUrl}/auth/login`;

    try {
      const response = await axios.post(url, formData, { withCredentials: true });
      if (response.data.success) {
        if (isSignUp) {
          setIsSignUp(false);
        } else {
          localStorage.setItem("role", response.data.data.role);
          onAuth();
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black relative justify-center items-center px-4 md:px-0">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[18rem] md:w-[22rem] h-[18rem] md:h-[22rem] bg-yellow-500 opacity-40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[14rem] md:w-[18rem] h-[14rem] md:h-[18rem] bg-red-500 opacity-35 rounded-full blur-[100px]"></div>
        <div className="absolute top-0 right-0 w-[12rem] md:w-[14rem] h-[12rem] md:h-[14rem] bg-red-500 opacity-30 rounded-full blur-[90px]"></div>
        <div className="absolute bottom-0 right-0 w-[10rem] md:w-[12rem] h-[10rem] md:h-[10rem] bg-red-500 opacity-25 rounded-full blur-[80px]"></div>
      </div>

      {/* Left Section: Logo */}
      <div className="flex items-center justify-center md:w-1/2 w-full mb-8 md:mb-0">
        <Link to="/" className="text-white text-6xl md:text-[80px] font-extrabold tracking-wide">
          PI<span className="text-yellow-500 text-[80px] md:text-[100px]">Z</span>
          <span className="text-red-500 text-[85px] md:text-[120px]">Z</span>ER
        </Link>
      </div>

      {/* Right Section: Form */}
      <div className="relative z-10 w-full md:w-1/2 flex justify-center p-4">
        <div className="w-full max-w-md p-8 bg-white/10 border border-white/20 shadow-xl backdrop-blur-md rounded-2xl">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full p-3 bg-transparent border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-red-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full p-3 bg-transparent border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-red-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Mobile Number</label>
                  <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required className="w-full p-3 bg-transparent border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-red-500" />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 bg-transparent border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-yellow-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full p-3 bg-transparent border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-yellow-500" />
            </div>
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-300">Role</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full p-3 bg-transparent border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="USER" className="text-black">User</option>
                  <option value="ADMIN" className="text-black">Admin</option>
                </select>
              </div>
            )}
            <button type="submit" className="w-full py-3 text-white bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg hover:from-yellow-500 hover:to-red-500 transition-all">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-yellow-500 hover:text-red-500 transition-all">
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}