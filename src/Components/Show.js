import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import Context from '../Context/Context';
import search from '../images/searchIcon.svg';
// import '../style/header.css';
import SearchBar from './SearchBar';

function Show({ title }) {
  const { handleChange, searchFilter } = useContext(Context);
  const [show, setShow] = useState(false);

  const showSearch = () => {
    setShow(!show);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ showSearch }
        className="btn-show"
      >
        <img
          data-testid="search-top-btn"
          src={ search }
          alt="search"
          // style={ { left: '600px', position: 'absolute' } }
        />
      </button>
      {show && (
        <div className="show">
          <input
            data-testid="search-input"
            type="text"
            name="searchName"
            value={ searchFilter.searchName }
            onChange={ handleChange }
            placeholder="Search Recipe"
            className="input-search"
          />
          <SearchBar title={ title } />
        </div>
      )}
    </div>
  );
}

Show.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Show;
