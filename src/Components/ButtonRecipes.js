import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const maxCategoria = 5;

function ButtonRecipes({ endpoit, chave }) {
  const [categorias, setCategorias] = useState([]);
  const [categoriasFilter, setCategoriasFilter] = useState([]);
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
          className="button-filter"
        >
          {e.strCategory}
        </button>))}
    </div>
  );
}

ButtonRecipes.propTypes = {
  chave: PropTypes.string.isRequired,
  endpoit: PropTypes.string.isRequired,
};

export default ButtonRecipes;
