import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white overflow-hidden">
            
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Yellow Glow - Center */}
                <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[22rem] h-[22rem] bg-yellow-500 opacity-30 rounded-full blur-[120px]"></div>

                {/* Red Glow - Top Right */}
                <div className="absolute top-0 right-0 w-[14rem] h-[14rem] bg-red-500 opacity-30 rounded-full blur-[100px]"></div>

                {/* Red Glow - Bottom Left */}
                <div className="absolute bottom-0 left-0 w-[16rem] h-[16rem] bg-red-500 opacity-25 rounded-full blur-[90px]"></div>
            </div>

            {/* Privacy Policy Card */}
            <div className="relative max-w-4xl w-full bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-12 rounded-2xl shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold text-yellow-500 text-center mb-6">
                    Privacy Policy
                </h1>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Welcome to <span className="text-yellow-500">Pizzer</span>. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
                </p>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">1. Information We Collect</h2>
                <p className="text-gray-300 mt-2">
                    We collect your name, email, phone number, and delivery address when you place an order. Additionally, browsing data is collected through cookies to enhance your experience.
                </p>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                    <li>To process and deliver your orders.</li>
                    <li>To improve our website and services.</li>
                    <li>To send special offers and promotions (only if you opt-in).</li>
                    <li>To analyze website traffic for a better user experience.</li>
                </ul>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">3. Cookies & Tracking</h2>
                <p className="text-gray-300 mt-2">
                    We use cookies to improve our website’s functionality. You can control cookies through your browser settings.
                </p>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">4. Data Security</h2>
                <p className="text-gray-300 mt-2">
                    We take security seriously and implement safeguards to protect your data. However, no online method is 100% secure, so always keep your login credentials safe.
                </p>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">5. Third-Party Sharing</h2>
                <p className="text-gray-300 mt-2">
                    We do not sell your data. However, we may use third-party services like payment gateways, which securely handle your information.
                </p>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">6. Your Rights</h2>
                <p className="text-gray-300 mt-2">
                    You can access, modify, or delete your personal data by contacting us at <span className="text-yellow-500">support@pizzer.com</span>.
                </p>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">7. Changes to This Policy</h2>
                <p className="text-gray-300 mt-2">
                    We may update this Privacy Policy from time to time. Any changes will be posted here.
                </p>

                {/* Back to Home Button */}
                <div className="mt-6 text-center">
                    <Link to="/" className="inline-block px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition duration-300">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
