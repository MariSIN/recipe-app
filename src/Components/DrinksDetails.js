import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { favoriteLocalStorage } from '../helpers/LocalStorage';
import useRecipeDetails from '../hooks/useRecipeDetails';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinksDetails({ title }) {
  const {
    recipe,
    recomendations,
    isSaved,
    ingredient,
    measure,
    inProgressRecipe,
    copyLink,
    isCopied,
    isFav,
    setIsFav,
  } = useRecipeDetails();

  const [isInProgress, setisInProgress] = useState();

  const history = useHistory();

  useEffect(() => {
    const pathNameId = history.location.pathname;
    const path = pathNameId.split('/')[3];

    setisInProgress(path);
  }, [history.location.pathname]);

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

  const ingredientCheckList = (
    <ul>
      {ingredient.map((i, index) => (
        <li key={ index }>
          <label
            htmlFor={ i }
            data-testid={ `${index}-ingredient-step` }
          >
            <input type="checkbox" name={ i } id={ i } />
            {`${i} : ${measure[index]}`}
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      {recipe.map((item) => (
        <div key={ Number(item.idDrink) }>
          <img
            data-testid="recipe-photo"
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            style={ { maxWidth: '200px' } }
          />
          <div>
            <button type="button" data-testid="share-btn" onClick={ copyLink }>
              <img src={ shareIcon } alt="share-icon" />
            </button>
            <button
              type="button"
              onClick={ () => favoriteLocalStorage(recipe, title, setIsFav) }
            >
              <img
                data-testid="favorite-btn"
                src={ isFav ? blackHeartIcon : whiteHeartIcon }
                alt="favoriteIcon"
              />

            </button>
            {isCopied && <p>Link copied!</p>}
          </div>
          <h1 data-testid="recipe-title">{item.strDrink}</h1>
          <p data-testid="recipe-category">{item.strAlcoholic}</p>
          {isInProgress ? ingredientCheckList : ingredientList}
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
      {isInProgress ? (
        <button
          data-testid="finish-recipe-btn"
          type="button"
          style={ { position: 'fixed', bottom: '0px' } }
        >
          Finish Recipe
        </button>
      ) : (
        <button
          data-testid="start-recipe-btn"
          type="button"
          style={ { position: 'fixed', bottom: '0px' } }
          onClick={ inProgressRecipe }
        >
          {isSaved ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

DrinksDetails.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DrinksDetails;
