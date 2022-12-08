import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from './Header';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isShared, setIsShared] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes((recipes));
    setFilteredRecipes(recipes);
  }, []);

  const handleShare = (recipe) => {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setIsShared(recipe.name);
  };

  const handleFilter = ({ target }) => {
    const { value } = target;
    if (value === 'all') {
      const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setFilteredRecipes((recipes));
    } else {
      const filter = doneRecipes.filter((item) => item.type === value);
      setFilteredRecipes(filter);
    }
  };

  return (
    <header>
      <Header title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          value="meal"
          onClick={ handleFilter }
        >
          Meals

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="drink"
          onClick={ handleFilter }
        >
          Drinks

        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ handleFilter }
        >
          All

        </button>
      </div>
      {filteredRecipes?.map((recipe, index) => (
        <>
          <Link to={ `/${recipe.type}s/${recipe.id}` } key={ index }>
            <div>
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
            </div>
          </Link>
          <button
            type="button"
            onClick={ () => handleShare(recipe) }

          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIcon"
            />
          </button>
          {isShared === recipe.name && <p>Link copied!</p>}
        </>
      ))}
    </header>
  );
}

export default DoneRecipes;
