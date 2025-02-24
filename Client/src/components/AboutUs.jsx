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

            {/* Footer */}
            <div className="text-gray-400 text-sm text-center py-6 relative z-10">
                <p>&copy; 2025 Pizzer. All rights reserved.</p>
            </div>
        </div>
    );
}



// other designs


// export default function AboutUs() {
//     return (
//         <div className="p-6 md:p-12 lg:p-24 pt-24 bg-gray-800">
//             <div className="container mx-auto border-2 border-gray-700 rounded-lg p-6 md:p-12 bg-gray-900 shadow-lg">
//                 <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
//                     About Pizzer
//                 </h1>
//                 <p className="text-lg text-white mb-4 md:pt-8">
//                     Welcome to PIZZER, where we bring the authentic taste of Italy right to your doorstep! Our passion for pizza drives us to use only the freshest ingredients and traditional recipes to create mouth-watering pizzas that will leave you craving for more. Whether you prefer a classic Margherita or a loaded Meat Lover's, we have something for everyone. Our commitment to quality and customer satisfaction ensures that every bite is a delightful experience. Join us on a culinary journey and discover why PIZZER is the best place for pizza lovers!
//                 </p>
//                 <p className="text-lg text-white mb-4">
//                     At PIZZER, we believe that pizza is more than just food; it's a way of bringing people together. Our cozy and welcoming atmosphere is perfect for family gatherings, date nights, or simply enjoying a delicious meal with friends. We take pride in our friendly and attentive staff who are dedicated to making your dining experience memorable. From the moment you walk through our doors, you'll be greeted with a smile and treated like family.
//                 </p>
//                 <p className="text-lg text-white mb-4">
//                     Our menu features a wide variety of pizzas, from traditional favorites to unique and innovative creations. We also offer a selection of appetizers, salads, and desserts to complement your meal. Each pizza is handcrafted with care, using our signature dough that is made fresh daily. Our sauces are prepared in-house, and we use only the finest cheeses and toppings to ensure the highest quality.
//                 </p>
//                 <p className="text-lg text-white mb-4">
//                     In addition to our dine-in experience, we offer convenient takeout and delivery options so you can enjoy PIZZER's delicious pizzas from the comfort of your own home. Our online ordering system makes it easy to customize your order and have it ready for pickup or delivered right to your door. We also cater to special dietary needs with gluten-free and vegetarian options available.
//                 </p>
//                 <p className="text-lg text-white mb-4">
//                     At PIZZER, we are committed to giving back to the community that has supported us over the years. We regularly participate in local events and fundraisers, and we are proud to support various charitable organizations. We believe in making a positive impact and being a part of the community we serve.
//                 </p>
//                 <p className="text-lg text-white">
//                     Thank you for choosing PIZZER. We look forward to serving you and sharing our love for pizza with you. Whether you're a longtime fan or a first-time visitor, we promise to deliver an exceptional dining experience that will keep you coming back for more. Buon appetito!
//                 </p>
//             </div>
//         </div>
//     );
// }