import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

function Header({ title }) {
  const { handleChange, searchFilter, setSearchResult } = useContext(Context);
  const [show, setShow] = useState(false);

  const showSearch = () => {
    setShow(!show);
  };

  const fetchAPI = async () => {
    if (searchFilter.selectedFilter === 'Ingredient') {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchFilter.searchName}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResult(data);
    }
    if (searchFilter.selectedFilter === 'Name') {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFilter.searchName}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResult(data);
    }
    if (searchFilter.selectedFilter === 'First Letter') {
      if (searchFilter.searchName.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchFilter.searchName}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResult(data);
    }
  };

  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profile } alt="profile" />
      </Link>
      <button
        type="button"
        onClick={ showSearch }
      >
        <img
          data-testid="search-top-btn"
          src={ search }
          alt="search"
        />
      </button>
      {show && (
        <div>
          <input
            data-testid="search-input"
            type="text"
            name="searchName"
            value={ searchFilter.searchName }
            onChange={ handleChange }
            placeholder="Search Recipe"
          />
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
            onClick={ fetchAPI }
          >
            Search

          </button>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
