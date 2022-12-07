import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [savedFavorites, setSavedFavorites] = useState(true);
  const [isCopy, setIsCopy] = useState('');

  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

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

  useEffect(() => {
    JSON.parse(localStorage.getItem(favorite));
    if (favorite === undefined) {
      return setFavoriteRecipes([null]);
    }
    setFavoriteRecipes(favorite);
  }, []);

  const removeSave = (id) => {
    setSavedFavorites(savedFavorites);
    if (savedFavorites) {
      const removeLocalStorage = favoriteRecipes.filter((item) => item.id !== id);
      JSON.parse(localStorage.removeItem('favoriteRecipes'));
      JSON.stringify(localStorage.setItem('favoriteRecipes', removeLocalStorage));
      return setFavoriteRecipes(removeLocalStorage);
    }
  };
  return (
    <>
      <header>
        <Header title="Favorite Recipes" />
      </header>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {favoriteRecipes
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
