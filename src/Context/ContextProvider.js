import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import Context from './Context';

const drinks = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];
const maxFood = 12;

function ContextProvider({ children }) {
  const [searchFilter, setSearchFilter] = useState({
    searchName: '',
    selectedFilter: '',
  });
  const [searchResult, setSearchResult] = useState([]);
  const [foodFilter, setFoodFilter] = useState([]);
  const [initialFoodFilter, setInitialFoodFilter] = useState([]);

  const createFilter = (ArrayFilter) => {
    setFoodFilter(ArrayFilter);
    if (initialFoodFilter.length === 0) {
      setInitialFoodFilter(ArrayFilter);
    }
  };

  const handleInitialFoodFilter = () => {
    setFoodFilter(initialFoodFilter);
  };

  const handleFoodFilter = async ({ target }) => {
    const { value } = target;
    let url = '';
    let chave = '';
    if (drinks.includes(value)) {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`;
      chave = 'drinks';
    } else {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;
      chave = 'meals';
    }
    const result = await fetch(url);
    const data = await result.json();
    const arrayFood = data[chave];
    const novoArray = arrayFood.filter((e, i) => i < maxFood);
    setFoodFilter(novoArray);
  };

  const handleChange = useCallback(({ target }) => {
    setSearchFilter({
      ...searchFilter,
      [target.name]: target.value,
    });
  }, [searchFilter]);

  const value = useMemo(() => ({
    searchFilter,
    foodFilter,
    initialFoodFilter,
    setSearchFilter,
    handleChange,
    setSearchResult,
    createFilter,
    handleInitialFoodFilter,
    handleFoodFilter,
    searchResult,
  }), [searchFilter, handleChange, searchResult, foodFilter, initialFoodFilter]);

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
