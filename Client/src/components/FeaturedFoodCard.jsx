import { Link } from "react-router-dom";

export default function FeaturedFoodCard({ foodName, foodImage }) {
    return (
        <div className="bg-black/20 backdrop-blur-lg border-2 border-white/20 rounded-2xl shadow-lg w-[260px] h-[320px]
                        sm:w-[300px] sm:h-[350px] p-6 m-4 flex flex-col items-center 
                        transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-yellow-500/30">
            
            <h1 className="text-white text-xl font-bold text-center mb-4">{foodName}</h1>
            
            <div className="flex justify-center mt-4">
                <img className="w-36 h-[9rem] object-cover rounded-lg shadow-md" src={foodImage} alt={foodName} />
            </div>
            
            <Link to="/menu">
                <button className="bg-yellow-500 text-black font-bold py-2 px-4 mt-6 rounded-lg transition-all 
                                   hover:bg-yellow-600 hover:scale-105 hover:shadow-md">
                    See Menu
                </button>
            </Link>
        </div>
    );
}