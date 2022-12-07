import { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import Header from './Header';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes((recipes || []));
  }, []);

  return (
    <header>
      <Header title="Done Recipes" />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-meal-btn">Meals</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {doneRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
            style={ { width: '200px' } }
          />
          <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
          {recipe.type === 'meal' ? (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}

            </p>
          ) : (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.alcoholicOrNot}`}

            </p>
          )}
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <div>
            {recipe.tags.slice(0, 2).map((i) => (
              <p data-testid={ `${index}-${i}-horizontal-tag` } key={ i }>{i}</p>
            ))}
          </div>
          <button
            type="button"
            onClick={ () => copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }

          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIcon"
            />
          </button>
        </div>
      ))}
    </header>
  );
}

export default DoneRecipes;
