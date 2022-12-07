import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
// import '../style/header.css';

function Header({ title }) {
  return (
    <div>
      <div className="header">
        <Link to="/profile">
          <img data-testid="profile-top-btn" src={ profile } alt="profile" />
        </Link>
      </div>
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
