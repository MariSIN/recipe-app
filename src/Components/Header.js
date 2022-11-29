import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

function Header({ title }) {
  const [show, setShow] = useState(false);

  const showSearch = () => {
    setShow(!show);
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
        <input data-testid="search-input" type="text" placeholder="Search" />
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
