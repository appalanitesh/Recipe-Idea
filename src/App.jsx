import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showQuickMeals, setShowQuickMeals] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState({});

  // Fetch recipes by ingredient
  const searchRecipes = async (ingredient) => {
    if (!ingredient.trim()) {
      setRecipes([]);
      setFilteredRecipes([]);
      return;
    }

    setLoading(true);
    setError(null);

    // Check if multiple ingredients were entered (comma-separated)
    const ingredients = ingredient
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i);
    const searchIngredient = ingredients[0]; // Use only the first ingredient
    const multipleIngredients = ingredients.length > 1;

    try {
      const response = await fetch(
        `${API_BASE_URL}/filter.php?i=${searchIngredient}`
      );
      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
        setFilteredRecipes(data.meals);

        // Show info if multiple ingredients were entered
        if (multipleIngredients) {
          setError(
            `Note: Searching for "${searchIngredient}" only. The free API doesn't support multiple ingredients at once. Use filters to narrow down results.`
          );
        }
      } else {
        setRecipes([]);
        setFilteredRecipes([]);
        setError(
          `No recipes found with "${searchIngredient}". Try using common ingredients like chicken, beef, tomato, or cheese.`
        );
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
      setRecipes([]);
      setFilteredRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch detailed recipe information
  const fetchRecipeDetails = async (mealId) => {
    if (recipeDetails[mealId]) {
      return recipeDetails[mealId];
    }

    try {
      const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);
      const data = await response.json();

      if (data.meals && data.meals[0]) {
        const details = data.meals[0];
        setRecipeDetails((prev) => ({ ...prev, [mealId]: details }));
        return details;
      }
    } catch (err) {
      console.error("Failed to fetch recipe details:", err);
    }
    return null;
  };

  // Fetch recipes by category
  const searchByCategory = async (category) => {
    if (category === "All") {
      setRecipes([]);
      setFilteredRecipes([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
        setFilteredRecipes(data.meals);
        setSearchTerm(""); // Clear search term when browsing by category
      } else {
        setRecipes([]);
        setFilteredRecipes([]);
        setError(`No recipes found in the ${category} category.`);
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
      setRecipes([]);
      setFilteredRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter recipes by category and quick meals
  useEffect(() => {
    const applyFilters = async () => {
      let filtered = [...recipes];

      // Filter by category (only if recipes were fetched by ingredient search)
      if (selectedCategory !== "All" && searchTerm && recipes.length > 0) {
        setLoading(true);
        const detailsPromises = filtered.map((recipe) =>
          fetchRecipeDetails(recipe.idMeal)
        );
        const allDetails = await Promise.all(detailsPromises);

        filtered = filtered.filter((recipe, index) => {
          const details = allDetails[index];
          return details && details.strCategory === selectedCategory;
        });
      }

      // Filter for quick meals (recipes with 7 or fewer ingredients)
      if (showQuickMeals && recipes.length > 0) {
        if (!selectedCategory || selectedCategory === "All" || !searchTerm) {
          setLoading(true);
          const detailsPromises = filtered.map((recipe) =>
            fetchRecipeDetails(recipe.idMeal)
          );
          await Promise.all(detailsPromises);
        }

        filtered = filtered.filter((recipe) => {
          const details = recipeDetails[recipe.idMeal];
          if (!details) return false;

          const ingredientCount = Object.keys(details).filter(
            (key) => key.startsWith("strIngredient") && details[key]
          ).length;

          return ingredientCount <= 7;
        });
      }

      setFilteredRecipes(filtered);
      setLoading(false);
    };

    applyFilters();
  }, [selectedCategory, showQuickMeals, recipes, searchTerm]);

  const handleSearch = () => {
    searchRecipes(searchTerm);
  };

  const handleRecipeClick = async (recipe) => {
    setSelectedRecipe(recipe);
    await fetchRecipeDetails(recipe.idMeal);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Recipe Ideas
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Find delicious recipes based on what you have in your kitchen
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          onSearchIngredient={searchRecipes}
          loading={loading}
        />

        {/* Filter Panel */}
        <FilterPanel
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          showQuickMeals={showQuickMeals}
          setShowQuickMeals={setShowQuickMeals}
          onCategoryClick={searchByCategory}
        />

        {/* Error/Info Message */}
        {error && (
          <div
            className={`px-4 py-3 rounded-lg mb-6 ${
              error.startsWith("Note:")
                ? "bg-blue-50 border border-blue-300 text-blue-800"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Loading recipes...</p>
          </div>
        )}

        {/* Recipe Grid */}
        {!loading && filteredRecipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && recipes.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Start by searching for an ingredient you have at home
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && recipes.length === 0 && !searchTerm && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍳</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Welcome to Recipe Ideas!
            </h2>
            <p className="text-gray-600 text-lg">
              Search for an ingredient above to find amazing recipes
            </p>
          </div>
        )}
      </main>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          details={recipeDetails[selectedRecipe.idMeal]}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
