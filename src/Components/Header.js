import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiOutlineUserCircle } from 'react-icons/hi';
import food from '../images/food.png';
import '../style/header.css';

function Header({ title }) {
  return (
    <div className="header-content">
      <div className="header">
        <h1
          className="recipe-title-header"
        >
          <img src={ food } alt="food" className="img-food" />
          Recipes
          <span
            className="recipe-app"
          >
            app
          </span>
        </h1>
        <Link to="/profile">
          <HiOutlineUserCircle
            data-testid="profile-top-btn"
            className="icon-profile icon-favorite-profile"
          />
        </Link>
        <h1
          data-testid="page-title"
          className="none"
          style={ { color: 'rgb(0, 255, 255, 0)' } }
        >
          {title}
        </h1>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
