import { FiHeart } from "react-icons/fi";

export default function AboutUs() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
            
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
                    About Pizzer
                </h1>
            </div>

            {/* Content Container */}
            <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-600">
                    <p className="text-lg text-gray-300 mb-6">
                        Welcome to <span className="font-bold text-yellow-400">PIZZER</span>, where we bring the authentic taste of Italy right to your doorstep! Our passion for pizza drives us to use only the freshest ingredients and traditional recipes to create mouth-watering pizzas that will leave you craving for more.
                    </p>
                    <p className="text-lg text-gray-300 mb-6">
                        At <span className="font-bold text-yellow-400">PIZZER</span>, pizza is more than just food; it's a way of bringing people together. Whether it’s a family gathering, date night, or a casual meal with friends, we ensure a warm and welcoming atmosphere with exceptional service.
                    </p>
                    <p className="text-lg text-gray-300 mb-6">
                        Our menu features a variety of handcrafted pizzas, fresh daily dough, in-house sauces, and premium toppings. We also offer a selection of appetizers, salads, and desserts to complete your meal.
                    </p>
                    <p className="text-lg text-gray-300 mb-6">
                        Enjoy our pizzas in our cozy dine-in area or take advantage of our convenient takeout and delivery services. Our online ordering system ensures a smooth and hassle-free experience.
                    </p>
                    <p className="text-lg text-gray-300 mb-6">
                        We are also committed to giving back to the community, actively participating in local events and supporting charitable causes. At <span className="font-bold text-yellow-400">PIZZER</span>, we believe in making a positive impact beyond serving delicious pizzas.
                    </p>
                    <p className="text-lg text-gray-300 flex items-center justify-center">
                        <FiHeart className="text-yellow-400 text-2xl mr-2" /> 
                        Thank you for choosing <span className="font-bold text-yellow-400 ml-1">PIZZER</span>! We can't wait to serve you!
                    </p>
                </div>
            </div>
        </div>
    );
}