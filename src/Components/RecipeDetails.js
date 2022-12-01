import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function RecipeDetails({ title }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recomendations, setRecomendations] = useState([]);

  const history = useHistory();

  const pathNameId = history.location.pathname;
  const fecthItens = async () => {
    const id = pathNameId.split('/')[2];
    if (title === 'Meals') {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data.meals);

      const url2 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response2 = await fetch(url2);
      const data2 = await response2.json();
      setRecomendations(data2.drinks);
    } else {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data.drinks);

      const url2 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response2 = await fetch(url2);
      const data2 = await response2.json();
      setRecomendations(data2.meals);
    }
  };

  useEffect(() => {
    fecthItens();
  }, []);

  useEffect(() => {
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
  }, [recipe]);

  const ingredientList = (
    <ul>
      {ingredient.map((i, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {console.log(index)}
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
          <h1 data-testid="recipe-title">{item.strDrink}</h1>
          <p data-testid="recipe-category">{item.strAlcoholic}</p>
          {ingredientList}
          <p data-testid="instructions">{item.strInstructions}</p>
        </div>
      ))}
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
