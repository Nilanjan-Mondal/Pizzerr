import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BaseUrl } from "@/configs/clientConfig";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await axios.get(`${BaseUrl}/auth/logout`, { withCredentials: true });
            window.location.href = "/auth";
        } catch (error) {
            console.error("Error signing out:", error.response?.data || error.message);
        }
    };

    const handleScrollToFooter = (event) => {
        event.preventDefault();
        const footer = document.getElementById("footer-section");
        if (footer) {
            footer.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        function handleScroll() {
            setIsOpen(false); // Close the navbar when scrolling
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    

    return (
        <>
            <nav className="bg-black bg-opacity-80 backdrop-blur-lg p-4 shadow-md relative z-50">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-white text-2xl md:text-[30px] font-bold">
                        PI<span className="text-yellow-500 text-[30px] md:text-[35px]">Z</span><span className="text-red-500 text-[35px] md:text-[40px]">Z</span>ER
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6">
                        <li><Link to="/" className="text-white hover:text-red-500">Home</Link></li>
                        <li><Link to="/about" className="text-white hover:text-yellow-400">About Us</Link></li>
                        <li><Link to="/menu" className="text-white hover:text-orange-400">Menu</Link></li>
                        <li><a href="#footer-section" onClick={handleScrollToFooter} className="text-white hover:text-red-500">Legals</a></li>
                    </ul>

                    {/* Icons (Desktop) */}
                    <div className="hidden md:flex space-x-5 items-center relative">
                        <Link to="/cart" className="text-white flex items-center hover:text-orange-400">
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            Cart
                        </Link>
                        <div className="relative" ref={dropdownRef}>
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                                className="text-white flex items-center hover:text-yellow-400"
                            >
                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                Profile
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-90 backdrop-blur-md rounded-md shadow-lg py-2 z-50">
                                    <Link to="/profile" className="block px-4 py-2 text-white hover:bg-red-500">Profile</Link>
                                    {userRole === "ADMIN" && (
                                        <Link to="/add-product" className="block px-4 py-2 text-white hover:bg-yellow-400">Add Product</Link>
                                    )}
                                    <button 
                                        onClick={handleSignOut} 
                                        className="block w-full text-left px-4 py-2 text-white hover:bg-orange-400"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hamburger Menu Toggle (Mobile) */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
                        <FontAwesomeIcon icon={faBars} size="lg" />
                    </button>
                </div>
            </nav>

            {/* Sidebar Menu (Mobile) */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-black bg-opacity-90 backdrop-blur-lg text-white transform 
                            ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 shadow-lg z-40`}
            >
                {/* Fixed Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-white text-2xl hover:text-red-500"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <ul className="mt-16 space-y-6 text-center">
                    <li><Link to="/" className="block py-2 text-lg hover:text-red-500" onClick={() => setIsOpen(false)}>Home</Link></li>
                    <li><Link to="/about" className="block py-2 text-lg hover:text-yellow-400" onClick={() => setIsOpen(false)}>About Us</Link></li>
                    <li><Link to="/menu" className="block py-2 text-lg hover:text-orange-400" onClick={() => setIsOpen(false)}>Menu</Link></li>
                    <li><a href="#footer-section" onClick={handleScrollToFooter} className="block py-2 text-lg hover:text-red-500">Legals</a></li>
                </ul>

                {/* Evenly Spaced Icons (Mobile) */}
                <div className="mt-10 flex flex-col justify-center items-center space-y-6">
                    <Link to="/profile" className="flex items-center hover:text-yellow-400" onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        Profile
                    </Link>
                    {userRole === "ADMIN" && (
                        <Link to="/add-product" className="flex items-center hover:text-red-500" onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Add Product
                        </Link>
                    )}
                    <Link to="/cart" className="flex items-center hover:text-orange-400" onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                        Cart
                    </Link>
                    <button
                        onClick={() => {
                            handleSignOut();
                            setIsOpen(false);
                        }}
                        className="flex items-center text-red-500 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faTimes} className="mr-2" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Overlay (Click to Close Menu) */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>
            )}
        </>
    );
}
