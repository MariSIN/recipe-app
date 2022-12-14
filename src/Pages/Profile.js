import { HiHeart, HiLogout, HiOutlineCheck, HiUserCircle } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../style/profile.css';

function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));

  const login = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="Profile" />
      <div className="profile-container">
        <div className="user-container">
          <HiUserCircle className="user" />
          <p data-testid="profile-email">{email?.email}</p>
        </div>
        <div className="path-buttons">
          <div>
            <HiOutlineCheck className="icons-profile" />
            <button
              data-testid="profile-done-btn"
              type="button"
              onClick={ () => history.push('/done-recipes') }
            >
              Done Recipes
            </button>
          </div>
          <div>
            <HiHeart className="icons-profile" />
            <button
              data-testid="profile-favorite-btn"
              type="button"
              onClick={ () => history.push('/favorite-recipes') }
            >
              Favorite Recipes
            </button>
          </div>
          <div>
            <HiLogout className="icons-profile" />
            <button
              data-testid="profile-logout-btn"
              type="button"
              onClick={ login }
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
