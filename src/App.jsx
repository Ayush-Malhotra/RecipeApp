import { useState,useEffect , useRef} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import Header from './Header';

const dietaryOptions = [
  'Gluten Free',
  'Ketogenic',
  'Vegetarian',
  'Lacto-Vegetarian',
  'Ovo-Vegetarian',
  'Vegan',
  'Pescetarian',
  'Paleo',
  'Primal',
  'Whole30'
];

function App() {
    const dropdownRef = useRef(null);
  
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [vegetableNames, setVegetableNames] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [numRecipes, setNumRecipes] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [detailedRecipe, setDetailedRecipe] = useState(null);
  const [searchType, setSearchType] = useState('ingredients'); // New state for search type
  const [productQuery, setProductQuery] = useState(''); // New state for product query
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);

    if (files.length > 0) {
      const formData = new FormData();
      
      files.forEach(file => {
        formData.append('firstFile', file);
      });

      setLoading(true);
      try {
        const response = await axios.post('https://recipeappbackend-gvjj.onrender.com/api/detect', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.data.length === 0) {
          alert('No ingredients detected');
        }
        setVegetableNames(response.data.join(', '));
      } 
      catch (error) {
        alert('No ingredients detected');
        console.error('Error detecting vegetables:', error);
      } 
      finally {
        setLoading(false);
      }
    }
  };

  const handleVegetableNamesChange = (event) => {
    setVegetableNames(event.target.value);
  };

  const handleDietaryRestrictionsChange = (option) => {
    setDietaryRestrictions(prevState =>
      prevState.includes(option)
        ? prevState.filter(item => item !== option)
        : [...prevState, option]
    );
  };

  const handleNumRecipesChange = (event) => {
    setNumRecipes(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleProductQueryChange = (event) => {
    setProductQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    if(vegetableNames === ''){
      alert('Please select an image or either type inside the ingredient box');
      return;
    }
    event.preventDefault();
    setLoading(true);
    try {
      let response;
      if (searchType === 'ingredients') {
        response = await axios.post('https://recipeappbackend-gvjj.onrender.com/api/recipe', {
          vegetableNames,
          dietaryRestrictions,
          numRecipes
        });
      } else {
        const dietaryRestrictionsQuery = dietaryRestrictions.join(',');
        response = await axios.get(`https://recipeappbackend-gvjj.onrender.com/api/search`, {
          params: {
            query: productQuery,
            numRecipes,
            dietaryRestrictions: dietaryRestrictionsQuery
          }
        });
      }
      if (response.data.length === 0) {
        alert('No recipes found with these ingredients. Please try with other set of ingredients');
      }
      setRecipes(response.data);
    } 
    catch (error) {
      alert('No recipes found with these ingredients. Please try with other set of indredients');
      console.error('Error fetching recipes:', error);
    } 
    finally {
      setLoading(false);
    }
  };

  const handleShowDetails = async (recipeId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://recipeappbackend-gvjj.onrender.com/api/recipe/${recipeId}`);
      setDetailedRecipe(response.data);
    } catch (error) {
      console.error('Error fetching detailed recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setRecipes([]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  return (
    
    <Router>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} className='headings'/>
      <div className='container'>
        
        <Routes>
          <Route path="/" element={
            !recipes.length ? (
              <form className='form' onSubmit={handleSubmit} encType="multipart/form-data">
                <h1 className='title'>Smart Recipe Generator</h1>
                <label className='file-label'>
                  <input
                    className='file-input'
                    type="file"
                    name='firstFile'
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                  <span className='file-custom'>Choose Images</span>
                </label>
                <div className='preview'>
                  {selectedFiles.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className='preview-image'
                    />
                  ))}
                </div>
                {loading ? (
                  <div className='loader'>Finding Ingredients...</div>
                ) : (
                  <>
                    <div className='input-group'>
                      {searchType === 'ingredients' ? (
                        <textarea
                          className='textarea'
                          placeholder='Enter vegetable names, separated by commas'
                          value={vegetableNames}
                          onChange={handleVegetableNamesChange}
                        />
                      ) : (
                        <input
                          className='input'
                          type='text'
                          value={productQuery}
                          onChange={handleProductQueryChange}
                          placeholder='Enter product name'
                        />
                      )}
                    </div>
                    <div className='toggle-group'>
                      <label>
                        <input
                          type="radio"
                          value="ingredients"
                          checked={searchType === 'ingredients'}
                          onChange={handleSearchTypeChange}
                        />
                        <span>Search by Ingredients</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="product"
                          checked={searchType === 'product'}
                          onChange={handleSearchTypeChange}
                        />
                        <span>Search by Dish</span>
                      </label>
                    </div>
                        <div className='dropdown' ref={dropdownRef}>
                        <div className='dropdown-header' onClick={() => setDropdownOpen(!dropdownOpen)}>
                        Select Dietary Restrictions
                        <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
                        </div>
                        {dropdownOpen && (
                        <div className='dropdown-menu'>
                        {dietaryOptions.map((option) => (
                        <label key={option} className='dropdown-item'>
                        <input
                        type='checkbox'
                        checked={dietaryRestrictions.includes(option)}
                        onChange={() => handleDietaryRestrictionsChange(option)}
                        />
                        {option}
                        </label>
                     ))}
                </div>
      )}
                    </div>
                    <div className='selected-restrictions'>
                      {dietaryRestrictions.length > 0 ? (
                        <p>{dietaryRestrictions.join(', ')}</p>
                      ) : (
                        <p>No dietary restrictions selected</p>
                      )}
                    </div>
                      <p>Number of Recipes Required</p>
                      <input
                        className='input'
                        type='number'
                        min='1'
                        max='10'
                        value={numRecipes}
                        onChange={handleNumRecipesChange}
                        placeholder='Number of recipes'
                      />
                  </>
                )}
                <button className='submit-button' type='submit'>Generate Recipe</button>
              </form>
            ) : (
              <>
                <button className='back-button' onClick={handleBack}>Back</button>
                <div className='recipes-grid'>
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} onShowDetails={handleShowDetails} />
                  ))}
                </div>
              </>
            )
          } />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;