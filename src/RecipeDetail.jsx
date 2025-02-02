import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://recipeappbackend-gvjj.onrender.com/api/recipe/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching detailed recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className='loader'>Loading...</div>;
  }

  if (!recipe) {
    return <div className='error'>Recipe not found</div>;
  }

  return (
    <div className='recipe-detail'>
      <h1 className='headers'>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className='recipe-image' />
      <h1>Ingredients</h1>
      <div className='ingredients-list'>
        {recipe.extendedIngredients.map((ingredient) => (
          <div key={ingredient.id} className='ingredient-item'>
            <img 
              className='ingImg'
              src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`} 
              alt={ingredient.name}
            />
            <span>{ingredient.original}</span>
          </div>
        ))}
        
      </div>
      <h1>Instructions</h1>
      <div className='instructions-list'>
        {recipe.analyzedInstructions[0]?.steps.map((step) => (
          <div key={step.number} className='instruction-step'>
            <h3>Step {step.number}</h3>
            <p>{step.step}</p>
          </div>
        ))}
      </div>
    </div>
  );

};

export default RecipeDetail;