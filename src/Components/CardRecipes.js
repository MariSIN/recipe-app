import PropTypes from 'prop-types';
import '../style/meals.css';

function CardRecipes({ img, name, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="card-recipe"
    >
      <p
        data-testid={ `${index}-card-name` }
        className="card-name"
      >
        {name}
      </p>
      <img
        src={ img }
        alt="foto Comida"
        data-testid={ `${index}-card-img` }
        className="card-img"
      />

    </div>
  );
}

CardRecipes.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardRecipes;
