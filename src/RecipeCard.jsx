
import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className='recipe-card'>
      <img src={recipe.image} alt={recipe.title} className='recipe-image' />
      <h2 className='recipe-title'>{recipe.title}</h2>
      {/* <div className='ingredients'>
        <div className='ingredients-column'>
          <h3>Used Ingredients:</h3>
          <ul>
            {recipe.usedIngredients !=null && recipe.usedIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className='ingredient-image'
                  onClick={() => window.open(ingredient.image, '_blank')}
                />
                <span className='ingredient-text'>{ingredient.original}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='ingredients-column'>
          <h3>Missed Ingredients:</h3>
          <ul>
            {recipe.missedIngredients !=null && recipe.missedIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className='ingredient-image'
                  onClick={() => window.open(ingredient.image, '_blank')}
                />
                <span className='ingredient-text'>{ingredient.original}</span>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
      <Link to={`/recipe/${recipe.id}`} className='details-button'>Show Detailed Recipe</Link>
    </div>
  );
};

export default RecipeCard;