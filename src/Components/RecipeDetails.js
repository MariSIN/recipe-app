import PropTypes from 'prop-types';
import DrinksDetails from './DrinksDetails';
import MealsDetails from './MealsDetails';

function RecipeDetails({ title }) {
  if (title === 'Meals') {
    return <MealsDetails title={ title } />;
  }

  return <DrinksDetails title={ title } />;
}

RecipeDetails.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RecipeDetails;
