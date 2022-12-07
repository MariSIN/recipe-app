import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [savedFavorites, setSavedFavorites] = useState(false);
  const [isCopy, setIsCopy] = useState('');

  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const copyLink = ((i) => {
    copy(`http://localhost:3000/${favorite[i].type}s/${favorite[i].id}`);
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

  const toggleSave = (i, index) => {
    setSavedFavorites(!savedFavorites);
    if (savedFavorites) {
      return localStorage.removeItem(i[index]);
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
              onClick={ () => toggleSave(item, index) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ savedFavorites ? whiteHeartIcon : blackHeartIcon }
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
