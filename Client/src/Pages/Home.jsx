import pizzaimg from "../assets/pizzaTop.png";
import cokeimg from "../assets/coke.png";
import fryimg from "../assets/fries.png";
import desertimg from "../assets/brownie.png";
import garlicBreadimg from "../assets/GarlicBread.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice, faCheck } from '@fortawesome/free-solid-svg-icons';
import FeaturedFoodCard from '../components/FeaturedFoodCard'; // Import the FeaturedFoodCard component

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 pt-[45px] pb-[10rem]">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-center md:text-left">
                <div className="max-w-lg">
                    <h1 className="text-white text-3xl md:text-4xl font-bold">
                        ENJOY YOUR PIZZA IN TOWN!
                    </h1>
                    <ul className="text-white mt-4 space-y-2">
                        <li className="flex items-center justify-center md:justify-start">
                            <FontAwesomeIcon icon={faCheck} className="text-red-500 mr-2" />
                            Free Home Delivery 24 Hours
                        </li>
                        <li className="flex items-center justify-center md:justify-start">
                            <FontAwesomeIcon icon={faCheck} className="text-red-500 mr-2" />
                            Authentic Italian Pizzas
                        </li>
                        <li className="flex items-center justify-center md:justify-start">
                            <FontAwesomeIcon icon={faCheck} className="text-red-500 mr-2" />
                            Served Hot
                        </li>
                    </ul>
                    <a href="/menu" className="inline-flex items-center mt-4 px-5 py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600 transition duration-300">
                        <FontAwesomeIcon icon={faPizzaSlice} className="mr-2" />
                        Order Now
                    </a>
                </div>

                {/* Image - Moves below text on mobile */}
                <img src={pizzaimg} alt="pizza" className="w-40 md:w-[29rem] h-auto mx-auto" />
            </div>

            {/* Featured Foods Section - Scrollable Row */}
            <div className="mt-12 w-[1200px] overflow-x-auto">
                <div className="flex space-x-6 w-max px-4">
                    <FeaturedFoodCard foodName="Delicious Pizza" foodImage={pizzaimg} />
                    <FeaturedFoodCard foodName="Soft Drinks" foodImage={cokeimg} />
                    <FeaturedFoodCard foodName="French Fry" foodImage={fryimg} />
                    <FeaturedFoodCard foodName="Garlic Bread" foodImage={garlicBreadimg} />
                    <FeaturedFoodCard foodName="Deserts" foodImage={desertimg} />
                </div>
            </div>
        </div>
    );
}