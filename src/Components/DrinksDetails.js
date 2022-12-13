import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { favoriteLocalStorage } from '../helpers/LocalStorage';
import useRecipeDetails from '../hooks/useRecipeDetails';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/mealsDetails.css';

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
  const [checksArr, setChecksArr] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const history = useHistory();

  const pathName = history.location.pathname;
  const id = pathName.split('/')[2];

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const verify = doneRecipes?.some((i) => i.id === recipe[0]?.idDrink);
    setIsDone(verify);
  }, [recipe]);

  useEffect(() => {
    const path = pathName.split('/')[3];
    setisInProgress(path);
  }, [pathName]);

  useEffect(() => {
    const inProgreesRecipes = JSON
      .parse((localStorage.getItem('inProgressRecipes')));
    if (inProgreesRecipes) {
      const obj = Object
        .values((inProgreesRecipes.drinks[id] || [])).reduce((acc, curr) => ([
          // https://stackoverflow.com/questions/18418806/javascript-array-declaration-with-or
          ...acc, curr,
        ]), []);
      setChecksArr(obj);
    }
  }, [id]);

  const handleChecks = ({ target }) => {
    const inProgreesRecipes = JSON
      .parse((localStorage.getItem('inProgressRecipes')));
    const { drinks } = inProgreesRecipes;
    const { name, checked } = target;
    if (checked) {
      setChecksArr([...checksArr, name]);
      drinks[id] = [...(drinks[id] || []), name];
    } else {
      setChecksArr([...checksArr.filter((i) => i !== name)]);
      drinks[id] = [...drinks[id].filter((item) => item !== name)];
    }
    console.log(drinks);
    localStorage
      .setItem('inProgressRecipes', JSON.stringify({ ...inProgreesRecipes, drinks }));
  };

  const isDisabled = () => {
    const ingredientNumber = ingredient.length;
    const inProgreesRecipes = JSON
      .parse((localStorage.getItem('inProgressRecipes')));
    const { drinks } = inProgreesRecipes;
    const ingredientCheck = (drinks[id] || []).length;
    return ingredientCheck === ingredientNumber;
  };

  const finishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const finishObj = {
      id: recipe[0].idDrink,
      type: 'drink',
      nationality: '',
      category: recipe[0].strCategory,
      alcoholicOrNot: recipe[0].strAlcoholic,
      name: recipe[0].strDrink,
      image: recipe[0].strDrinkThumb,
      doneDate: new Date().toISOString(),
      tags: (recipe.strTags || []),
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
            style={ checksArr.some((item) => item === i)
              ? { textDecoration: 'line-through solid rgb(0, 0 , 0)' }
              : { textDecoration: 'none' } }
          >
            <input
              type="checkbox"
              name={ i }
              id={ i }
              checked={ checksArr.some((item) => item === i) }
              onChange={ handleChecks }
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
        <div key={ Number(item.idDrink) } className="recipe-card">
          <img
            data-testid="recipe-photo"
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
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
            <h1 data-testid="recipe-title">{item.strDrink}</h1>
            <p data-testid="recipe-category">{item.strAlcoholic}</p>
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
    </div>
  );
}

DrinksDetails.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DrinksDetails;
