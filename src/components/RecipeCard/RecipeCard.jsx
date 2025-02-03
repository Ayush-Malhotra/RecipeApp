import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className='recipe-card'>
      <img src={recipe.image} alt={recipe.title} className='recipe-image' />
      <h2 className='recipe-title'>{recipe.title}</h2>
      <Link to={`/recipe/${recipe.id}`} className='details-button'>Show Detailed Recipe</Link>
    </div>
  );
};

export default RecipeCard;