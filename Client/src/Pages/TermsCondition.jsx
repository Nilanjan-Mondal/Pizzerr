import { Link } from "react-router-dom";

export default function TermsConditions() {
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

            {/* Terms & Conditions Card */}
            <div className="relative max-w-4xl w-full bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-12 rounded-2xl shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold text-yellow-500 text-center mb-6">
                    Terms & Conditions
                </h1>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Welcome to <span className="text-yellow-500">Pizzer</span>. By using our website, you agree to the following terms and conditions. Please read them carefully.
                </p>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">1. Acceptance of Terms</h2>
                <p className="text-gray-300 mt-2">
                    By accessing and using our website, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
                </p>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">2. Ordering & Payments</h2>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                    <li>All orders placed through our website are subject to availability.</li>
                    <li>Payments must be made in full before order confirmation.</li>
                    <li>We accept major credit cards, debit cards, and online payment methods.</li>
                </ul>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">3. Cancellations & Refunds</h2>
                <p className="text-gray-300 mt-2">
                    Orders cannot be canceled once they are being prepared. Refunds are only applicable for incorrect or damaged orders.
                </p>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">4. User Conduct</h2>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                    <li>Users must provide accurate information when placing orders.</li>
                    <li>Any misuse of the website or fraudulent activity may result in legal action.</li>
                    <li>We reserve the right to refuse service to anyone at our discretion.</li>
                </ul>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">5. Intellectual Property</h2>
                <p className="text-gray-300 mt-2">
                    All content, logos, and images on our website are the property of **Pizzer** and may not be used without permission.
                </p>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">6. Liability Limitation</h2>
                <p className="text-gray-300 mt-2">
                    We are not responsible for any indirect damages resulting from the use of our website, including delivery delays or technical issues.
                </p>

                <h2 className="text-xl md:text-2xl text-yellow-500 mt-6">7. Modifications</h2>
                <p className="text-gray-300 mt-2">
                    We reserve the right to update these Terms & Conditions at any time. Changes will be posted on this page.
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
