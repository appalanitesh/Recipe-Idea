function RecipeCard({ recipe, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {recipe.strMeal}
        </h3>
        <p className="text-sm text-orange-500 mt-2 font-medium">
          Click to view recipe
        </p>
      </div>
    </div>
  )
}

export default RecipeCard
