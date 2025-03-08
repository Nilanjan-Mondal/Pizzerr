import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthPage from "./Pages/AuthPage";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import AboutUs from "./components/AboutUs";
import axios from "axios";
import Menu from "./Pages/Menu";
import AddProduct from "./Pages/AddProduct";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Footer from "./components/Footer";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/TermsCondition";
import FAQ from "./Pages/Faq";
import { BaseUrl } from "./configs/clientConfig";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${BaseUrl}/auth/protected`, { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <div className="bg-gray-800 min-h-screen">
        {isAuthenticated ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/add-product" element={<AddProduct/>} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route path="/auth" element={<AuthPage onAuth={() => setIsAuthenticated(true)} />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;