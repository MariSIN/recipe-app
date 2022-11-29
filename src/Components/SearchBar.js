import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';

function SearchBar({ title }) {
  const { handleChange, searchFilter, setSearchResult } = useContext(Context);
  const history = useHistory();

  const fetchMeals = async () => {
    if (searchFilter.selectedFilter === 'Ingredient') {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchFilter.searchName}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResult(data.meals);
      if (data.meals.length === 1) {
        const { idMeal } = data.meals[0];
        history.push(`/meals/${idMeal}`);
      }
    }
    if (searchFilter.selectedFilter === 'Name') {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFilter.searchName}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResult(data.meals);
      if (data.meals.length === 1) {
        const { idMeal } = data.meals[0];
        history.push(`/meals/${idMeal}`);
      }
    }
    if (searchFilter.selectedFilter === 'First Letter') {
      if (searchFilter.searchName.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchFilter.searchName}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResult(data.meals);
      if (data.meals.length === 1) {
        const { idMeal } = data.meals[0];
        history.push(`/meals/${idMeal}`);
      }
    }
  };

  const fetchDrinks = async () => {
    if (searchFilter.selectedFilter === 'Ingredient') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchFilter.searchName}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResult(data.drinks);
      if (data.drinks.length === 1) {
        const { idDrink } = data.drinks[0];
        history.push(`/drinks/${idDrink}`);
      }
    }
    if (searchFilter.selectedFilter === 'Name') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchFilter.searchName}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResult(data.drinks);
      if (data.drinks.length === 1) {
        const { idDrink } = data.drinks[0];
        history.push(`/drinks/${idDrink}`);
      }
    }
    if (searchFilter.selectedFilter === 'First Letter') {
      if (searchFilter.searchName.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchFilter.searchName}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResult(data.drinks);
      if (data.drinks.length === 1) {
        const { idDrink } = data.drinks[0];
        history.push(`/drinks/${idDrink}`);
      }
    }
  };

  return (
    <>
      <label htmlFor="ingredient">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="selectedFilter"
          value="Ingredient"
          onChange={ handleChange }
          id="ingredient"
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          name="selectedFilter"
          value="Name"
          onChange={ handleChange }
          id="name"
        />
      </label>
      <label htmlFor="first-letter">
        First Letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="selectedFilter"
          value="First Letter"
          onChange={ handleChange }
          id="first-letter"
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ title === 'Meals' ? fetchMeals : fetchDrinks }
      >
        Search
      </button>
    </>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchBar;
