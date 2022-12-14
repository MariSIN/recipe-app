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
  const [initialMealsFilter, setInitialMealsFilter] = useState([]);
  const [initialDrinkFilter, setInitialDrinksFilter] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const createFilter = (ArrayFilter, chave) => {
    if (chave === 'meals') {
      setFoodFilter(ArrayFilter);
      setInitialMealsFilter(ArrayFilter);
      setShowSearch(false);
    } else {
      setFoodFilter(ArrayFilter);
      setInitialDrinksFilter(ArrayFilter);
      setShowSearch(false);
    }
  };

  const handleInitialFoodFilter = (chave) => {
    if (chave === 'meals') {
      setFoodFilter(initialMealsFilter);
      setShowSearch(false);
    } else {
      setFoodFilter(initialDrinkFilter);
      setShowSearch(false);
    }
  };

  const handleFoodFilter = async ({ target }) => {
    const { value } = target;
    console.log(value);
    let url = '';
    let chave = '';
    if (value) {
      if (drinks.includes(value)) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`;
        chave = 'drinks';
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;
        chave = 'meals';
      }
      const result = await fetch(url);
      const data = await result.json();
      const arrayFood = await data[chave];
      const novoArray = await arrayFood.filter((e, i) => i < maxFood);
      setFoodFilter(novoArray);
      setShowSearch(false);
    }
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
    setSearchFilter,
    handleChange,
    setSearchResult,
    createFilter,
    handleInitialFoodFilter,
    handleFoodFilter,
    searchResult,
    showSearch,
    setShowSearch,
  }), [searchFilter, handleChange, searchResult, foodFilter,
    initialDrinkFilter, initialMealsFilter]);

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
