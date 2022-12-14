import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { GiMeal, GiSteak, GiChickenOven, GiGoat } from 'react-icons/gi';
import { CgCoffee } from 'react-icons/cg';
import { RiCake3Fill } from 'react-icons/ri';
import Context from '../Context/Context';
import '../style/meals.css';

const maxCategoria = 5;
const objImgs = {
  beef: <GiSteak />,
  breakfast: <CgCoffee />,
  chicken: <GiChickenOven />,
  dessert: <RiCake3Fill />,
  goat: <GiGoat />,
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
    <span className="img-filter">{objImgs[e.toLowerCase()] }</span>
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
        </button>))}

      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleInitialFoodFilter }
        className="button-filter"
      >
        <sapn className="img-filter"><GiMeal /></sapn>

      </button>
    </div>
  );
}

ButtonRecipes.propTypes = {
  chave: PropTypes.string.isRequired,
  endpoit: PropTypes.string.isRequired,
};

export default ButtonRecipes;
