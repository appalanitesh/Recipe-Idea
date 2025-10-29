function FilterPanel({ selectedCategory, setSelectedCategory, showQuickMeals, setShowQuickMeals, onCategoryClick }) {
  const categories = [
    'All',
    'Breakfast',
    'Dessert',
    'Starter',
    'Chicken',
    'Beef',
    'Pork',
    'Seafood',
    'Vegetarian',
    'Vegan',
    'Pasta',
    'Side'
  ]

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    onCategoryClick(category)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Meal Type / Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Meals Toggle */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <label htmlFor="quick-meals" className="text-sm font-semibold text-gray-700">
              Quick Meals Only
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Show recipes with 7 or fewer ingredients
            </p>
          </div>
          <button
            id="quick-meals"
            onClick={() => setShowQuickMeals(!showQuickMeals)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              showQuickMeals ? 'bg-orange-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                showQuickMeals ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
