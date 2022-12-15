import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiMeal, GiShare } from 'react-icons/gi';
import { BsHeartFill } from 'react-icons/bs';
import { BiDrink } from 'react-icons/bi';
import { MdFastfood } from 'react-icons/md';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../style/doneRecipes.css';
import '../style/header.css';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isCopy, setIsCopy] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const copyLink = ((i, item) => {
    copy(`http://localhost:3000/${favoriteRecipes[i].type}s/${favoriteRecipes[i].id}`);
    const copyTime = 3000;

    setIsCopy(item.name);
    setTimeout(() => {
      setIsCopy('');
    }, copyTime);
  });

  const removeSave = (id) => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const removeStorage = favorite.filter((item) => item.id !== id);
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
    setFavoriteRecipes(favorite);
    setFilteredRecipes(favorite);
  }, []);

  return (
    <div className="container-favorite-recipe">
      <header className="header header-favorite">
        <Header title="Favorite Recipes" />
      </header>
      <div className="teste">
        <div className="container-buttons-filter">
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            value="meal"
            onClick={ handleFilter }
            className="button-filter-recipe"
          >
            <GiMeal />
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            value="drink"
            onClick={ handleFilter }
            className="button-filter-recipe"
          >
            <BiDrink />
          </button>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            value="all"
            onClick={ handleFilter }
            className="button-filter-recipe"
          >
            <MdFastfood />
          </button>
        </div>
        {filteredRecipes
          ?.map((item, index) => (
            <main key={ index }>
              <Link to={ `/${item.type}s/${item.id}` }>
                <div className="recipe">
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ item.image }
                    alt={ item.name }
                  />
                  <div className="recipes-infos">
                    <h1
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {item.name}
                    </h1>
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                      className="recipe-category"
                    >
                      {`${item.nationality} - ${item.category} ${item.alcoholicOrNot}`}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="buttons">
                <button
                  type="button"
                  onClick={ () => copyLink(index, item) }
                  className="share-btn"
                >
                  <GiShare
                    data-testid={ `${index}-horizontal-share-btn` }
                    className="button-share"
                    alt="shareIcon"
                  />
                </button>
                {isCopy === item.name && <span>Link copied!</span>}
                <button
                  type="button"
                  className="share-btn"
                  onClick={ () => removeSave(item.id) }
                >
                  <BsHeartFill
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    alt="favoriteIcon"
                    className="button-share"
                    style={ { width: '33px' } }
                  />
                </button>
              </div>
            </main>
          ))}
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default FavoriteRecipes;
