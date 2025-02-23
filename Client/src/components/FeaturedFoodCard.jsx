export default function FeaturedFoodCard({ foodName, foodImage }) {
    return (
        <div className="bg-gray-900 rounded-lg shadow-lg border-2 border-gray-700 w-[260px] h-[320px] 
                        sm:w-[300px] sm:h-[350px] p-6 m-4 flex flex-col items-center 
                        transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            
            <h1 className="text-white text-xl font-bold text-center">{foodName}</h1>
            
            <div className="flex justify-center mt-7">
                <img className="w-36 h-[9rem] object-cover rounded-lg shadow-md" src={foodImage} alt={foodName} />
            </div>
            
            <button className="bg-yellow-500 text-black font-bold py-2 px-4 mt-10 rounded-lg transition-all 
                               hover:bg-yellow-600 hover:scale-105 hover:shadow-md">
                See Menu
            </button>
        </div>
    );
}
