import PropTypes from 'prop-types';

function CardRecipes({ img, name, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <p data-testid={ `${index}-card-name` }>{name}</p>
      <img src={ img } alt="foto Comida" data-testid={ `${index}-card-img` } />

    </div>
  );
}

CardRecipes.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardRecipes;
