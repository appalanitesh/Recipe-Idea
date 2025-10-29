import { useState } from 'react'

function SearchBar({ searchTerm, setSearchTerm, onSearch, onSearchIngredient, loading }) {
  const popularIngredients = [
    'Chicken',
    'Beef',
    'Tomato',
    'Cheese',
    'Rice',
    'Potato',
    'Salmon',
    'Egg'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  const handleQuickSearch = (ingredient) => {
    setSearchTerm(ingredient)
    onSearchIngredient(ingredient)
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter one ingredient (e.g., chicken, tomato, cheese)..."
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          onClick={onSearch}
          disabled={loading || !searchTerm.trim()}
          className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          Search
        </button>
      </form>

      {/* Quick Search Buttons */}
      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-2">Popular ingredients:</p>
        <div className="flex flex-wrap gap-2">
          {popularIngredients.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => handleQuickSearch(ingredient)}
              disabled={loading}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-orange-100 hover:text-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBar
