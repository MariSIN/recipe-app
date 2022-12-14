import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';
import beef from '../images/beef.png';
import breakfast from '../images/breakfast.png';
import chicken from '../images/chicken.png';
import dessert from '../images/dessert.png';
import goat from '../images/goat.png';
import recipes from '../images/recipes.png';
import ordinary from '../images/ordinary drink.png';
import shake from '../images/shake.png';
import cocoa from '../images/cocoa.png';
import cocktail from '../images/cocktail.png';
import other from '../images/other.png';
import '../style/meals.css';

const maxCategoria = 5;
const objImgs = {
  beef,
  breakfast,
  chicken,
  dessert,
  goat,
  'ordinary drink': ordinary,
  shake,
  cocoa,
  cocktail,
  'other / unknown': other,
};

function ButtonRecipes({ endpoit, chave }) {
  const [categorias, setCategorias] = useState([]);
  const [categoriasFilter, setCategoriasFilter] = useState([]);
  const { handleInitialFoodFilter, handleFoodFilter } = useContext(Context);
  useEffect(() => {
    fetch(endpoit)
      .then((promise) => promise.json())
      .then((data) => setCategorias(data[chave]));
  }, []);
  useEffect(() => {
    if (categorias.length !== 0) {
      const novoArray = categorias.filter((e, i) => i < maxCategoria);
      setCategoriasFilter(novoArray);
    }
  }, [categorias]);

  const categories = (e) => (
    <img
      src={ objImgs[e.toLowerCase()] }
      alt={ e.toLowerCase() }
      className="img-filter"
    />
  );

  return (
    <div className="container-button-filter">
      {categoriasFilter.map((e, i) => (
        <button
          type="button"
          key={ i }
          data-testid={ `${e.strCategory}-category-filter` }
          value={ e.strCategory }
          className="button-filter"
          onClick={ handleFoodFilter }
        >
          {categories(e.strCategory)}
          {e.strCategory}
        </button>))}

      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleInitialFoodFilter(chave) }
        className="button-filter"
      >
        <img src={ recipes } alt="ALL-Recipes" className="img-filter" />
        All
      </button>
    </div>
  );
}
ButtonRecipes.propTypes = {
  chave: PropTypes.string.isRequired,
  endpoit: PropTypes.string.isRequired,
};
export default ButtonRecipes;
