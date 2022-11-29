import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <img data-testid="profile-top-btn" src={ profile } alt="profile" />
      <img data-testid="profile-top-btn" src={ search } alt="search" />
      <h1 data-testid="page-title">Recipe App</h1>
    </header>
  );
}

export default Header;
