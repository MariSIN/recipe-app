import PropTypes from 'prop-types';
import { favoriteLocalStorage } from '../helpers/LocalStorage';
import useRecipeDetails from '../hooks/useRecipeDetails';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function MealsDetails({ title }) {
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

  return (
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
}

MealsDetails.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MealsDetails;
