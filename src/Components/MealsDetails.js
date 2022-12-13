import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { favoriteLocalStorage } from '../helpers/LocalStorage';
import useRecipeDetails from '../hooks/useRecipeDetails';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/mealsDetails.css';

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

  const [isInProgress, setisInProgress] = useState();
  const [checksArr, setChecksArr] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const history = useHistory();

  const pathName = history.location.pathname;
  const id = pathName.split('/')[2];

  useEffect(() => {
    const path = pathName.split('/')[3];
    setisInProgress(path);
  }, [pathName]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const verify = doneRecipes?.some((i) => i.id === recipe[0]?.idMeal);
    setIsDone(verify);
  }, [recipe]);

  useEffect(() => {
    const inProgreesRecipes = JSON
      .parse((localStorage.getItem('inProgressRecipes')));
    if (inProgreesRecipes) {
      const obj = Object
        .values((inProgreesRecipes.meals[id] || [])).reduce((acc, curr) => ([
          // https://stackoverflow.com/questions/18418806/javascript-array-declaration-with-or
          ...acc, curr,
        ]), []);
      setChecksArr(obj);
    }
  }, [id]);

  const handleChecks = ({ target }) => {
    const inProgreesRecipes = JSON
      .parse((localStorage.getItem('inProgressRecipes')));
    const { meals } = inProgreesRecipes;
    const { name, checked } = target;
    if (checked) {
      setChecksArr([...checksArr, name]);
      meals[id] = [...(meals[id] || []), name];
    } else {
      setChecksArr([...checksArr.filter((i) => i !== name)]);
      meals[id] = [...meals[id].filter((item) => item !== name)];
    }
    localStorage
      .setItem('inProgressRecipes', JSON.stringify({ ...inProgreesRecipes, meals }));
  };

  const isDisabled = () => {
    const ingredientNumber = ingredient.length;
    const inProgreesRecipes = JSON
      .parse((localStorage.getItem('inProgressRecipes')));
    const { meals } = inProgreesRecipes;
    const ingredientCheck = (meals[id] || []).length;
    return ingredientCheck === ingredientNumber;
  };

  const finishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const finishObj = {
      id: recipe[0].idMeal,
      type: 'meal',
      nationality: recipe[0].strArea,
      category: recipe[0].strCategory,
      alcoholicOrNot: '',
      name: recipe[0].strMeal,
      image: recipe[0].strMealThumb,
      doneDate: new Date().toISOString(),
      // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
      tags: recipe[0].strTags.split(','),
    };

    localStorage
      .setItem('doneRecipes', JSON.stringify([...(doneRecipes || []), finishObj]));

    history.push('/done-recipes');
  };

  const ingredientList = (
    <ul className="ingredient-list">
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
    <ul className="ingredient-list-check ingredient-list">
      {ingredient.map((i, index) => (
        <li key={ index }>
          <label
            htmlFor={ i }
            data-testid={ `${index}-ingredient-step` }
            style={ checksArr?.some((item) => item === i)
              ? { textDecoration: 'line-through solid rgb(0, 0 , 0)' }
              : { textDecoration: 'none' } }
          >
            <input
              type="checkbox"
              name={ i }
              id={ i }
              onChange={ handleChecks }
              checked={ checksArr?.some((item) => item === i) }
            />
            {`${i} : ${measure[index]}`}
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="details-container">
      {recipe.map((item) => (
        <div key={ Number(item.idMeal) } className="recipe-card">
          <img
            data-testid="recipe-photo"
            src={ item.strMealThumb }
            alt={ item.strMeal }
            className="recipe-img"
          />
          <div>
            <div className="favorite-and-share">
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
            </div>
            {isCopied && <p>Link copied!</p>}
          </div>
          <div className="recipe-name">
            <h1 data-testid="recipe-title">{item.strMeal}</h1>
            <p data-testid="recipe-category">{item.strCategory}</p>
          </div>
          <div className="list">
            <h1 className="section-titles">Ingredients</h1>
            {isInProgress ? ingredientCheckList : ingredientList}
          </div>
          <div>
            <h1 className="section-titles">Instructions</h1>
            <div className="ingredient-list instructions">
              <p data-testid="instructions">{item.strInstructions}</p>
            </div>
          </div>
          <div className="ingredient-list iframe-container">
            <h1 className="section-titles">Video</h1>
            <iframe
              data-testid="video"
              title={ item.strMeal }
              width="420"
              height="315"
              src={ item.strYoutube?.replace('watch?v=', 'embed/') }
              allowFullScreen
            />
          </div>
        </div>
      ))}
      <div className="button-container">
        {isInProgress ? (
          <button
            data-testid="finish-recipe-btn"
            type="button"
            style={ isDone ? { display: 'none' } : { display: 'block' } }
            disabled={ !isDisabled() }
            onClick={ finishRecipe }
            className="start-or-finish-button"
          >
            Finish Recipe
          </button>
        ) : (
          <button
            data-testid="start-recipe-btn"
            type="button"
            style={ isDone ? { display: 'none' } : { display: 'block' } }
            onClick={ inProgressRecipe }
            className="start-or-finish-button"
          >
            {isSaved ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )}
      </div>
      <div className="carrousel">
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
    </div>

  );
}

MealsDetails.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MealsDetails;
