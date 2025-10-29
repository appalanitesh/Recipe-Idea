# Recipe Ideas Application

A modern, responsive web application that helps users discover delicious recipes based on ingredients they have at home. Built with React, Vite, and Tailwind CSS, this application integrates with TheMealDB API to provide real-time recipe searches and detailed cooking instructions.

## Features

### Core Functionality

- **Ingredient-Based Search**: Search for recipes using ingredients you have available
- **Category Browsing**: Explore recipes by categories (Beef, Chicken, Dessert, Vegetarian, etc.)
- **Quick Meals Filter**: Find recipes with 7 or fewer ingredients for quick cooking
- **Detailed Recipe View**: Click any recipe to see full instructions, ingredients, measurements, and cooking videos
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### User Experience

- **Smart Search**: Type-ahead search with suggestions as you type
- **Visual Recipe Cards**: Beautiful image-based cards showing meal thumbnails
- **Category Filters**: Filter search results by specific meal categories
- **Loading States**: Smooth loading indicators for better UX
- **Error Handling**: User-friendly error messages and suggestions

## Technologies Used

### Frontend

- **React 19.1.1** - Modern UI component library
- **Vite 4.5.14** - Fast build tool and development server
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing

### API

- **TheMealDB API** - Free recipe database API
  - Endpoint: `https://www.themealdb.com/api/json/v1/1`

### Development Tools

- **ESLint** - Code linting and formatting
- **React Hooks** - Modern state management
- **NPM** - Package management

## Project Structure

```
recipe-ideas-app/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   │   ├── SearchBar.jsx      # Search input and suggestions
│   │   ├── FilterPanel.jsx    # Category and quick meal filters
│   │   ├── RecipeCard.jsx     # Individual recipe display card
│   │   └── RecipeModal.jsx    # Detailed recipe popup
│   ├── App.jsx         # Main application component
│   ├── App.css         # Application styles
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md           # This file
```

## Installation & Setup

### Prerequisites

- Node.js (version 14 or higher)
- NPM (comes with Node.js)

### Steps

1. **Clone or Download the Project**

   ```bash
   cd recipe-ideas-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173`

4. **Build for Production**

   ```bash
   npm run build
   ```

   Creates an optimized build in the `dist/` folder

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Usage Guide

### Searching for Recipes

1. **By Ingredient**:

   - Type an ingredient in the search bar (e.g., "chicken", "tomato", "cheese")
   - Click the search icon or press Enter
   - Browse through the results

2. **By Category**:

   - Click on any category button (Beef, Chicken, Dessert, etc.)
   - View all recipes in that category

3. **Quick Meals**:
   - Toggle the "Quick Meals Only" switch
   - See only recipes with 7 or fewer ingredients

### Viewing Recipe Details

- Click on any recipe card
- A modal will open showing:
  - Full recipe name
  - Category and cuisine
  - Complete ingredients list with measurements
  - Step-by-step cooking instructions
  - YouTube video link (if available)

### Tips

- Use common ingredients for better results (chicken, beef, rice, tomato, etc.)
- Combine ingredient search with category filters for refined results
- The free API searches one ingredient at a time

## API Information

This application uses **TheMealDB API** (Free Tier):

**Endpoints Used**:

- Search by ingredient: `/filter.php?i={ingredient}`
- Search by category: `/filter.php?c={category}`
- Get recipe details: `/lookup.php?i={meal_id}`

**Limitations**:

- Free tier allows only single ingredient searches
- No multi-ingredient filtering in a single API call
- Client-side filtering used for advanced features

## Features Breakdown

### 1. SearchBar Component

- Real-time ingredient suggestions
- Enter key support
- Loading state indication
- Clear search functionality

### 2. FilterPanel Component

- Category selection buttons
- Quick meals toggle switch
- Visual category indicators
- Responsive grid layout

### 3. RecipeCard Component

- High-quality meal images
- Meal name display
- Hover effects
- Click-to-view-details interaction

### 4. RecipeModal Component

- Full-screen overlay
- Detailed recipe information
- Ingredients with measurements
- Cooking instructions
- Video links
- Close on background click

## Deployment

This application is deployed on **Netlify** for easy access and demonstration.

### Deployment Steps:

1. Build the application: `npm run build`
2. Deploy the `dist/` folder to Netlify Drop
3. Access via the provided Netlify URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Fast page loads with Vite optimization
- Code splitting for efficient loading
- Lazy loading of recipe details
- Cached API responses for repeated queries

## Future Enhancements (Potential)

- Save favorite recipes to local storage
- Print recipe functionality
- Share recipes via social media
- Shopping list generation
- Nutritional information display
- User recipe ratings

## Credits

- **Recipe Data**: [TheMealDB](https://www.themealdb.com/)
- **UI Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS

---

## Development Notes

### Running the Project Locally

After cloning, simply:

```bash
npm install
npm run dev
```

### Building for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory, ready for deployment.

### Troubleshooting

**Problem**: Recipes not loading

- **Solution**: Check internet connection; API requires internet access

**Problem**: Build fails

- **Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Problem**: Styles not applying

- **Solution**: Ensure Tailwind CSS is properly configured in `tailwind.config.js`

---
