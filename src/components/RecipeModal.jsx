import { useEffect } from 'react'

function RecipeModal({ recipe, details, onClose }) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Prevent scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Get ingredients and measurements
  const getIngredients = () => {
    if (!details) return []

    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = details[`strIngredient${i}`]
      const measure = details[`strMeasure${i}`]

      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        })
      }
    }
    return ingredients
  }

  const ingredients = getIngredients()

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Image */}
        <div className="relative h-64 sm:h-80">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {recipe.strMeal}
          </h2>

          {details ? (
            <>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {details.strCategory && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    {details.strCategory}
                  </span>
                )}
                {details.strArea && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {details.strArea}
                  </span>
                )}
                {details.strTags && details.strTags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>

              {/* Ingredients */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Ingredients
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ingredients.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        <span className="text-gray-700">
                          {item.measure && <span className="font-medium">{item.measure} </span>}
                          {item.ingredient}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Instructions
                </h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {details.strInstructions}
                  </p>
                </div>
              </div>

              {/* Video Link */}
              {details.strYoutube && (
                <div className="mb-4">
                  <a
                    href={details.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Watch Video Tutorial
                  </a>
                </div>
              )}

              {/* Source Link */}
              {details.strSource && (
                <div>
                  <a
                    href={details.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    View Original Recipe →
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-600">Loading recipe details...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeModal
