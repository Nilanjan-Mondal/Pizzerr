import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer id="footer-section" className="relative bg-black text-white py-10">
            
            {/* Background Glow Effects */}

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
                    
                    {/* Navigation Links */}
                    <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-8 space-y-4 md:space-y-0">
                        <Link to="/privacy" className="text-sm md:text-base text-yellow-500 hover:text-yellow-400 transition duration-300">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-sm md:text-base text-yellow-500 hover:text-yellow-400 transition duration-300">
                            Terms & Conditions
                        </Link>
                        <Link to="/faq" className="text-sm md:text-base text-yellow-500 hover:text-yellow-400 transition duration-300">
                            FAQ
                        </Link>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex space-x-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 transition duration-300">
                            <FontAwesomeIcon icon={faFacebookF} size="lg" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 transition duration-300">
                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 transition duration-300">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 text-center">
                    <p className="text-xs md:text-sm text-gray-300">
                        &copy; {new Date().getFullYear()} Pizzer. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
