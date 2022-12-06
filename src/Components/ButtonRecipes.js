import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';

const maxCategoria = 5;

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
  return (
    <div className="container-button-filter">
      {categoriasFilter.map((e, i) => (
        <button
          type="button"
          key={ i }
          data-testid={ `${e.strCategory}-category-filter` }
          value={ e.strCategory }
          onClick={ handleFoodFilter }
        >
          {e.strCategory}
        </button>))}

      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleInitialFoodFilter }
      >
        ALL

      </button>
    </div>
  );
}

ButtonRecipes.propTypes = {
  chave: PropTypes.string.isRequired,
  endpoit: PropTypes.string.isRequired,
};

export default ButtonRecipes;
