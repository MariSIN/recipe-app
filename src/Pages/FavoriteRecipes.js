import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [savedFavorites, setSavedFavorites] = useState(false);

  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

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
      {favoriteRecipes
        ?.map((item, index) => (
          <main key={ index }>
            <h3
              data-testid={ `${index}-horizontal-top-text` }
            >
              {item.category} - {item.nationality}
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
              onClick={ () => toggleSave(item, index) }
            >
              <img
                data-testid="favorite-btn"
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
