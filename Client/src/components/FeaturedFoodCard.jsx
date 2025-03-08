import { Link } from "react-router-dom";

export default function FeaturedFoodCard({ foodName, foodImage }) {
    return (
        <div className="bg-black/20 backdrop-blur-lg border-2 border-white/20 rounded-2xl shadow-lg 
                        w-[260px] h-[350px] sm:w-[280px] sm:h-[380px] 
                        flex flex-col justify-between items-center p-4 m-2 
                        transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-yellow-500/30">
            
            <h1 className="text-white text-lg sm:text-xl font-bold text-center">{foodName}</h1>
            
            {/* Image Wrapper to Ensure Consistency */}
            <div className="w-[180px] h-[180px] flex items-center justify-center">
                <img className="w-full h-full object-contain rounded-lg shadow-md" src={foodImage} alt={foodName} />
            </div>
            
            <Link to="/menu">
                <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all 
                                   hover:bg-yellow-600 hover:scale-105 hover:shadow-md">
                    See Menu
                </button>
            </Link>
        </div>
    );
}
