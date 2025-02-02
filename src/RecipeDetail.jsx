import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [substitute, setSubstitute] = useState([]);
  const [currSubstitute, setCurrentSubstitute] = useState(null);

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
    return <div className='loader'>Generating Recipe...</div>;
  }

  if (!recipe) {
    return <div className='error'>Recipe not found</div>;
  }

  const findSubstitutes = async (ingredient) => {
    setCurrentSubstitute(ingredient);
    try {
      let response = await axios.post(`https://recipeappbackend-gvjj.onrender.com/api/recipe/subsitute`, {
        ingredient
      });
      setSubstitute(response.data);
    } catch (err) {
      console.log(err);
    }
  };

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
            <button className='substitute-button' onClick={() => findSubstitutes(ingredient.original)}>Find Substitute</button>
            {
              currSubstitute === ingredient.original && substitute.length > 0 && (
                <ul className='substitutes-list'>
                  {substitute.map((sub) => (
                    <li key={sub}>{sub}</li>
                  ))}
                </ul>
              )
            }
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