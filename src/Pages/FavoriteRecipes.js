import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isCopy, setIsCopy] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const copyLink = ((i) => {
    copy(`http://localhost:3000/${favoriteRecipes[i].type}s/${favoriteRecipes[i].id}`);
    const copyTime = 3000;
    const disappearMessage = 200;

    setTimeout(() => {
      setIsCopy('Link copied!');
      setTimeout(() => {
        setIsCopy('');
      }, copyTime);
    }, disappearMessage);
  });

  const removeSave = (id) => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(id);
    const removeStorage = favorite.filter((item) => item.id !== id);
    console.log(removeStorage);
    setFavoriteRecipes(removeStorage);
    setFilteredRecipes(removeStorage);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeStorage));
  };

  const handleFilter = ({ target }) => {
    const { value } = target;
    if (value === 'all') {
      setFilteredRecipes(favoriteRecipes);
    } else {
      const filter = favoriteRecipes.filter((item) => item.type === value);
      setFilteredRecipes(filter);
    }
  };

  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(favorite || []);
    setFilteredRecipes(favorite || []);
  }, []);

  return (
    <>
      <header>
        <Header title="Favorite Recipes" />
      </header>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ handleFilter }
      >
        All
      </button>
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
      {filteredRecipes
        ?.map((item, index) => (
          <main key={ index }>
            <h3
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${item.nationality} - ${item.category} ${item.alcoholicOrNot}`}
            </h3>
            <h4
              data-testid={ `${index}-horizontal-name` }
            >
              {item.name}
            </h4>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ item.image }
              alt={ item.name }
              style={ { width: '200px' } }
            />
            <button
              type="button"
              onClick={ () => copyLink(index) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="shareIcon"
              />
            </button>
            <span>{isCopy}</span>
            <button
              type="button"
              onClick={ () => removeSave(item.id) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="favoriteIcon"
              />
            </button>
          </main>
        ))}
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default FavoriteRecipes;
