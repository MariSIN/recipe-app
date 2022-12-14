import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';
import '../style/header.css';

function SearchBar({ title }) {
  const {
    handleChange,
    searchFilter,
    setSearchResult,
    setShowSearch,
  } = useContext(Context);
  const history = useHistory();

  const dataMeals = (data) => {
    if (data.meals.length === 1) {
      const { idMeal } = data.meals[0];
      history.push(`/meals/${idMeal}`);
    }
  };

  const dataDrink = (data) => {
    if (data.drinks.length === 1) {
      const { idDrink } = data.drinks[0];
      history.push(`/drinks/${idDrink}`);
    }
  };

  const fetchMeals = async () => {
    if (searchFilter.selectedFilter === 'Ingredient') {
      try {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchFilter.searchName}`;
        const response = await fetch(url);
        const data = await response.json();
        setSearchResult(data.meals);
        setShowSearch(true);
        dataMeals(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (searchFilter.selectedFilter === 'Name') {
      try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFilter.searchName}`;
        const response = await fetch(url);
        const data = await response.json();
        setSearchResult(data.meals);
        setShowSearch(true);

        dataMeals(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (searchFilter.selectedFilter === 'First Letter') {
      try {
        if (searchFilter.searchName.length > 1) {
          return global.alert('Your search must have only 1 (one) character');
        }
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchFilter.searchName}`;
        const response = await fetch(url);
        const data = await response.json();
        setSearchResult(data.meals);
        setShowSearch(true);

        dataMeals(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchDrinks = async () => {
    if (searchFilter.selectedFilter === 'Ingredient') {
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchFilter.searchName}`;
        const response = await fetch(url);
        const data = await response.json();
        setSearchResult(data.drinks);
        setShowSearch(true);

        dataDrink(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (searchFilter.selectedFilter === 'Name') {
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchFilter.searchName}`;
        const response = await fetch(url);
        const data = await response.json();
        setSearchResult(data.drinks);
        setShowSearch(true);

        dataDrink(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (searchFilter.selectedFilter === 'First Letter') {
      try {
        if (searchFilter.searchName.length > 1) {
          return global.alert('Your search must have only 1 (one) character');
        }
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchFilter.searchName}`;
        const response = await fetch(url);
        const data = await response.json();
        setSearchResult(data.drinks);
        setShowSearch(true);

        dataDrink();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="options-search">
      <div className="radio-buttons-search">
        <label htmlFor="ingredient" className="search-option">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="selectedFilter"
            value="Ingredient"
            className="ingredient search-option"
            onChange={ handleChange }
            id="ingredient"
          />
          Ingredient
        </label>
        <label htmlFor="name" className="search-option">
          <input
            data-testid="name-search-radio"
            type="radio"
            name="selectedFilter"
            className="name search-option"
            value="Name"
            onChange={ handleChange }
            id="name"
          />
          Name
        </label>
        <label htmlFor="first-letter" className="search-option">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="selectedFilter"
            className="first-letter search-option"
            value="First Letter"
            onChange={ handleChange }
            id="first-letter"
          />
          First Letter
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        className="btn-search"
        type="button"
        onClick={ title === 'Meals' ? fetchMeals : fetchDrinks }
      >

        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchBar;
