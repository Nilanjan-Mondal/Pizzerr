import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await axios.get("http://localhost:3500/auth/logout", { withCredentials: true });
            window.location.href = "/auth";
        } catch (error) {
            console.error("Error signing out:", error.response?.data || error.message);
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

    return (
        <>
            <nav className="bg-black bg-opacity-80 backdrop-blur-lg p-4 shadow-md relative z-50">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-white text-2xl font-bold">
                        PI<span className="text-yellow-500">Z</span><span className="text-red-500">Z</span>ER
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6">
                        <li><Link to="/" className="text-white hover:text-red-500">Home</Link></li>
                        <li><Link to="/about" className="text-white hover:text-yellow-400">About Us</Link></li>
                        <li><Link to="/menu" className="text-white hover:text-orange-400">Menu</Link></li>
                        <li><Link to="/contact" className="text-white hover:text-red-500">Contact Us</Link></li>
                    </ul>

                    {/* Icons (Desktop) */}
                    <div className="hidden md:flex space-x-5 items-center relative">
                        {/* Cart */}
                        <Link to="/cart" className="text-white flex items-center hover:text-orange-400">
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            Cart
                        </Link>
                        {/* Profile Dropdown */}
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

                    {/* Hamburger Icon (Mobile) */}
                    <button onClick={() => setIsOpen(true)} className="md:hidden text-white">
                        <FontAwesomeIcon icon={faBars} size="lg" />
                    </button>
                </div>
            </nav>

            {/* Sidebar Menu (Mobile) */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-black bg-opacity-90 backdrop-blur-lg text-white transform 
                            ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 shadow-lg z-40`}
            >
                {/* Close Button */}
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white">
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>

                {/* Menu Items */}
                <ul className="mt-16 space-y-6 text-center">
                    <li><Link to="/" className="block py-2 text-lg hover:text-red-500" onClick={() => setIsOpen(false)}>Home</Link></li>
                    <li><Link to="/about" className="block py-2 text-lg hover:text-yellow-400" onClick={() => setIsOpen(false)}>About Us</Link></li>
                    <li><Link to="/menu" className="block py-2 text-lg hover:text-orange-400" onClick={() => setIsOpen(false)}>Menu</Link></li>
                    <li><Link to="/contact" className="block py-2 text-lg hover:text-red-500" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
                </ul>

                {/* Icons (Mobile) */}
                <div className="mt-8 flex flex-col items-center space-y-4">
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



// other designs




// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";

// export default function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);
//     const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);
//     const navigate = useNavigate(); // Use navigate for routing

//     const handleSignOut = async () => {
//         try {
//             await axios.get("http://localhost:3500/auth/logout", { withCredentials: true });
//             window.location.href = "/auth"; // Reload to reflect sign-out
//         } catch (error) {
//             console.error("Error signing out:", error.response?.data || error.message);
//         }
//     };

//     return (
//         <>
//             <nav className="bg-gray-900 p-4">
//                 <div className="container mx-auto flex justify-between items-center">
//                     {/* Logo */}
//                     <Link to="/" className="text-white text-2xl font-bold">PIZZER</Link>

//                     {/* Desktop Menu */}
//                     <ul className="hidden md:flex space-x-6">
//                         <li><Link to="/" className="text-white">Home</Link></li>
//                         <li><Link to="/about" className="text-white">About Us</Link></li>
//                         <li><Link to="/menu" className="text-white">Menu</Link></li>
//                         <li><Link to="/contact" className="text-white">Contact Us</Link></li>
//                     </ul>

//                     {/* Icons (Desktop) */}
//                     <div className="hidden md:flex space-x-5 relative">
//                         <div className="relative" ref={dropdownRef}>
//                             <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-white flex items-center">
//                                 <FontAwesomeIcon icon={faUser} className="mr-2" />
//                                 Profile
//                             </button>
//                             {isDropdownOpen && (
//                                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
//                                     <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
//                                     {userRole === "ADMIN" && (
//                                         <Link to="/add-product" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Add Product</Link>
//                                     )}
//                                     <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Sign Out</button>
//                                 </div>
//                             )}
//                         </div>
//                         <Link to="/cart" className="text-white flex items-center">
//                             <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
//                             Cart
//                         </Link>
//                     </div>

//                     {/* Hamburger Icon (Mobile) */}
//                     <button onClick={() => setIsOpen(true)} className="md:hidden text-white">
//                         <FontAwesomeIcon icon={faBars} size="lg" />
//                     </button>
//                 </div>
//             </nav>

//             {/* Sidebar Menu (Mobile) */}
//             <div
//                 className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform 
//                             ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 shadow-lg z-30`}
//             >
//                 {/* Close Button */}
//                 <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white">
//                     <FontAwesomeIcon icon={faTimes} size="lg" />
//                 </button>

//                 {/* Menu Items */}
//                 <ul className="mt-16 space-y-6 text-center">
//                     <li><Link to="/" className="block py-2 text-lg" onClick={() => setIsOpen(false)}>Home</Link></li>
//                     <li><Link to="/about" className="block py-2 text-lg" onClick={() => setIsOpen(false)}>About Us</Link></li>
//                     <li><Link to="/menu" className="block py-2 text-lg" onClick={() => setIsOpen(false)}>Menu</Link></li>
//                     <li><Link to="/contact" className="block py-2 text-lg" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
//                 </ul>

//                 {/* Icons (Mobile) */}
//                 <div className="mt-8 flex flex-col items-center space-y-4">
//                     <Link to="/profile" className="flex items-center" onClick={() => setIsOpen(false)}>
//                         <FontAwesomeIcon icon={faUser} className="mr-2" />
//                         Profile
//                     </Link>
//                     {userRole === "ADMIN" && (
//                         <Link to="/add-product" className="flex items-center" onClick={() => setIsOpen(false)}>
//                             <FontAwesomeIcon icon={faUser} className="mr-2" />
//                             Add Product
//                         </Link>
//                     )}
//                     <Link to="/cart" className="flex items-center" onClick={() => setIsOpen(false)}>
//                         <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
//                         Cart
//                     </Link>
//                     <button
//                         onClick={() => {
//                             handleSignOut();
//                             setIsOpen(false);
//                         }}
//                         className="flex items-center text-red-500 hover:text-white"
//                     >
//                         <FontAwesomeIcon icon={faTimes} className="mr-2" />
//                         Sign Out
//                     </button>
//                 </div>
//             </div>

//             {/* Overlay (Click to Close Menu) */}
//             {isOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>
//             )}
//         </>
//     );
// }













// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";

// export default function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);
//     const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);
//     const navigate = useNavigate();

//     const handleSignOut = async () => {
//         try {
//             await axios.get("http://localhost:3500/auth/logout", { withCredentials: true });
//             window.location.href = "/auth"; 
//         } catch (error) {
//             console.error("Error signing out:", error.response?.data || error.message);
//         }
//     };

//     return (
//         <>
//             <nav className="bg-[#3E1F0D] p-4 shadow-lg"> {/* Warm dark brown background */}
//                 <div className="container mx-auto flex justify-between items-center">
//                     <Link to="/" className="text-[#FFD700] text-3xl font-extrabold tracking-wide">PIZZER</Link>

//                     {/* Desktop Menu */}
//                     <ul className="hidden md:flex space-x-6 text-[#FFDAB9]"> {/* Soft warm text color */}
//                         <li><Link to="/" className="hover:text-[#FF6347]">Home</Link></li>
//                         <li><Link to="/about" className="hover:text-[#FF6347]">About Us</Link></li>
//                         <li><Link to="/menu" className="hover:text-[#FF6347]">Menu</Link></li>
//                         <li><Link to="/contact" className="hover:text-[#FF6347]">Contact Us</Link></li>
//                     </ul>

//                     {/* Icons (Desktop) */}
//                     <div className="hidden md:flex space-x-5 relative">
//                         <div className="relative" ref={dropdownRef}>
//                             <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-[#FFDAB9] flex items-center">
//                                 <FontAwesomeIcon icon={faUser} className="mr-2" />
//                                 Profile
//                             </button>
//                             {isDropdownOpen && (
//                                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md py-2 z-20">
//                                     <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
//                                     {userRole === "ADMIN" && (
//                                         <Link to="/add-product" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Add Product</Link>
//                                     )}
//                                     <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Sign Out</button>
//                                 </div>
//                             )}
//                         </div>
//                         <Link to="/cart" className="text-[#FFDAB9] flex items-center">
//                             <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
//                             Cart
//                         </Link>
//                     </div>

//                     {/* Hamburger Icon (Mobile) */}
//                     <button onClick={() => setIsOpen(true)} className="md:hidden text-[#FFDAB9]">
//                         <FontAwesomeIcon icon={faBars} size="lg" />
//                     </button>
//                 </div>
//             </nav>

//             {/* Sidebar Menu (Mobile) */}
//             <div className={`fixed top-0 right-0 h-full w-64 bg-[#542B18] text-[#FFDAB9] transform 
//                 ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 shadow-lg z-30`}>
                
//                 {/* Close Button */}
//                 <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-[#FFD700]">
//                     <FontAwesomeIcon icon={faTimes} size="lg" />
//                 </button>

//                 {/* Menu Items */}
//                 <ul className="mt-16 space-y-6 text-center">
//                     <li><Link to="/" className="block py-2 text-lg hover:text-[#FF6347]" onClick={() => setIsOpen(false)}>Home</Link></li>
//                     <li><Link to="/about" className="block py-2 text-lg hover:text-[#FF6347]" onClick={() => setIsOpen(false)}>About Us</Link></li>
//                     <li><Link to="/menu" className="block py-2 text-lg hover:text-[#FF6347]" onClick={() => setIsOpen(false)}>Menu</Link></li>
//                     <li><Link to="/contact" className="block py-2 text-lg hover:text-[#FF6347]" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
//                 </ul>

//                 {/* Icons (Mobile) */}
//                 <div className="mt-8 flex flex-col items-center space-y-4">
//                     <Link to="/profile" className="flex items-center hover:text-[#FF6347]" onClick={() => setIsOpen(false)}>
//                         <FontAwesomeIcon icon={faUser} className="mr-2" />
//                         Profile
//                     </Link>
//                     {userRole === "ADMIN" && (
//                         <Link to="/add-product" className="flex items-center hover:text-[#FF6347]" onClick={() => setIsOpen(false)}>
//                             <FontAwesomeIcon icon={faUser} className="mr-2" />
//                             Add Product
//                         </Link>
//                     )}
//                     <Link to="/cart" className="flex items-center hover:text-[#FF6347]" onClick={() => setIsOpen(false)}>
//                         <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
//                         Cart
//                     </Link>
//                     <button
//                         onClick={() => {
//                             handleSignOut();
//                             setIsOpen(false);
//                         }}
//                         className="flex items-center text-[#FF6347] hover:text-white"
//                     >
//                         <FontAwesomeIcon icon={faTimes} className="mr-2" />
//                         Sign Out
//                     </button>
//                 </div>
//             </div>

//             {/* Overlay (Click to Close Menu) */}
//             {isOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>
//             )}
//         </>
//     );
// }
