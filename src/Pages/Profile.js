import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));
  console.log(email);

  const login = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <>
      <Header title="Profile" />
      <p data-testid="profile-email">{email?.email}</p>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes

      </button>

      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ login }
      >
        Logout

      </button>
      <Footer />
    </>
  );
}

export default Profile;
