import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MAX_RECOM_VALUE } from '../utilit/globalVariables';
import { notEmptyLocalStorage, notUndefinedLocalStorage } from './LocalStorage';

function RecipeDetails({ title }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [continueRecipes, setContinueRecipes] = useState();
  const [isSaved, setIsSaved] = useState(false);

  const history = useHistory();

  const pathNameId = history.location.pathname;
  const id = pathNameId.split('/')[2];
  const fecthItens = async () => {
    if (title === 'Meals') {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data.meals);

      const url2 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response2 = await fetch(url2);
      const data2 = await response2.json();
      setRecomendations(data2.drinks.slice(0, MAX_RECOM_VALUE));
    } else {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data.drinks);

      const url2 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response2 = await fetch(url2);
      const data2 = await response2.json();
      setRecomendations(data2.meals.slice(0, MAX_RECOM_VALUE));
    }
  };

  const ingredientEndMeasure = () => {
    if (recipe[0]) {
      const recipeIngredient = Object.entries(recipe[0])
        .filter((i) => i[0].includes('strIngredient'))
        .filter((i) => i[1] !== null && i[1] !== '')
        .map((i) => i[1]);
      setIngredient(recipeIngredient);

      const recipeMeasure = Object.entries(recipe[0])
        .filter((i) => i[0].includes('strMeasure'))
        .filter((i) => i[1] !== '' && i[1] !== null)
        .map((i) => i[1]);
      setMeasure(recipeMeasure);
    }
  };
  const inProgressRecipe = () => {
    const savedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (title === 'Meals') {
      history.push(`/meals/${id}/in-progress`);

      const newSavedMeal = {
        meals: {
          ...savedRecipes.meals,
          [id]: ingredient,
        },
        drinks: {
          ...savedRecipes.drinks,
        },
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(newSavedMeal));
      setContinueRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
    } else {
      history.push(`/drinks/${id}/in-progress`);

      const newSavedDrinks = {
        meals: {
          ...savedRecipes.meals,
        },
        drinks: {
          ...savedRecipes.drinks,
          [id]: ingredient,
        },
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(newSavedDrinks));
      setContinueRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
  };

  useEffect(() => {
    fecthItens();
    notEmptyLocalStorage(setContinueRecipes);
  }, []);

  useEffect(() => {
    notUndefinedLocalStorage(continueRecipes, title, id, setIsSaved);
  }, [continueRecipes]);

  useEffect(() => {
    ingredientEndMeasure();
  }, [recipe]);

  const ingredientList = (
    <ul>
      {ingredient.map((i, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {`${i} : ${measure[index]}`}
        </li>
      ))}
    </ul>
  );

  const mealsDetails = (
    <div>
      {recipe.map((item) => (
        <div key={ Number(item.idMeal) }>
          <img
            data-testid="recipe-photo"
            src={ item.strMealThumb }
            alt={ item.strMeal }
            style={ { maxWidth: '200px' } }
          />
          <div>
            <button type="button" data-testid="share-btn">Share</button>
            <button type="button" data-testid="favorite-btn">Favorite</button>
          </div>
          <h1 data-testid="recipe-title">{item.strMeal}</h1>
          <p data-testid="recipe-category">{item.strCategory}</p>
          {ingredientList}
          <p data-testid="instructions">{item.strInstructions}</p>
          <iframe
            data-testid="video"
            title={ item.strMeal }
            width="420"
            height="315"
            src={ item.strYoutube?.replace('watch?v=', 'embed/') }
            frameBorder="0"
            allowFullScreen
          />
        </div>
      ))}
      <div style={ { display: 'flex', overflowY: 'hidden', overflowX: 'scroll' } }>
        {recomendations.map((i, index) => (
          <div key={ Number(i.idDrink) } data-testid={ `${index}-recommendation-card` }>
            <img
              src={ i.strDrinkThumb }
              alt={ i.strDrink }
              style={ { maxWidth: '300px' } }
            />
            <p data-testid={ `${index}-recommendation-title` }>{ i.strDrink }</p>
          </div>
        ))}
      </div>
      <button
        data-testid="start-recipe-btn"
        type="button"
        style={ { position: 'fixed', bottom: '0px' } }
        onClick={ inProgressRecipe }
      >
        {isSaved ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );

  const drinkDetails = (
    <div>
      {recipe.map((item) => (
        <div key={ Number(item.idDrink) }>
          <img
            data-testid="recipe-photo"
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            style={ { maxWidth: '200px' } }
          />
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <h1 data-testid="recipe-title">{item.strDrink}</h1>
          <p data-testid="recipe-category">{item.strAlcoholic}</p>
          {ingredientList}
          <p data-testid="instructions">{item.strInstructions}</p>
        </div>
      ))}
      <div style={ { display: 'flex', overflowY: 'hidden', overflowX: 'scroll' } }>
        {recomendations.map((i, index) => (
          <div key={ Number(i.idMeal) } data-testid={ `${index}-recommendation-card` }>
            <img
              src={ i.strMealThumb }
              alt={ i.strMeal }
              style={ { maxWidth: '300px' } }
            />
            <p data-testid={ `${index}-recommendation-title` }>{ i.strMeal }</p>
          </div>
        ))}
      </div>
      <button
        data-testid="start-recipe-btn"
        type="button"
        style={ { position: 'fixed', bottom: '0px' } }
        onClick={ inProgressRecipe }
      >
        {isSaved ? 'Continue Recipe' : 'Start Recipe'}

      </button>
    </div>
  );

  if (title === 'Meals') {
    return mealsDetails;
  }

  return drinkDetails;
}

RecipeDetails.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RecipeDetails;

// allow="a
// ccelerometer; autoplay;
// clipboard-write; encrypited-media; gyroscop; picture-in-picture"
// allowFullScreen
