import PropTypes from 'prop-types';
import DrinksDetails from './DrinksDetails';

function RecipeInProgress({ title }) {
  if (title === 'Meals') {
    return <p>meals</p>;
  }

  return <DrinksDetails title={ title } />;
}

RecipeInProgress.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RecipeInProgress;
