import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Do you offer home delivery?",
            answer: "Yes! We offer free home delivery 24/7 within our service area. Just place your order, sit back, and enjoy!",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, debit cards, and online payment methods like PayPal, Google Pay, and Apple Pay.",
        },
        {
            question: "Are your pizzas made fresh?",
            answer: "Absolutely! Our pizzas are prepared fresh with high-quality ingredients and baked to perfection.",
        },
        {
            question: "Can I customize my pizza?",
            answer: "Yes! You can customize your pizza with your favorite toppings, cheese, and crust type.",
        },
        {
            question: "Do you have vegetarian or vegan options?",
            answer: "Yes! We offer a variety of vegetarian and vegan pizzas, along with plant-based sides.",
        },
        {
            question: "What is your refund policy?",
            answer: "Refunds are available for incorrect or damaged orders. Please contact our support team within 24 hours for assistance.",
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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

            {/* FAQ Card */}
            <div className="relative max-w-4xl w-full bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-12 rounded-2xl shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold text-yellow-500 text-center mb-6">
                    Frequently Asked Questions
                </h1>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white/10 border border-white/20 rounded-lg p-4">
                            <button
                                className="w-full flex justify-between items-center text-lg font-medium text-yellow-500 focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <FontAwesomeIcon
                                    icon={openIndex === index ? faChevronUp : faChevronDown}
                                    className="text-white"
                                />
                            </button>
                            {openIndex === index && (
                                <p className="text-gray-300 mt-2">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>

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
