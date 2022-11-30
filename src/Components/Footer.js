import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" style={ { position: 'fixed', bottom: '0px' } }>
      <Link to="/meals">
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="mealIcon" />
      </Link>
      <Link to="/drinks">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinkIcon" />
      </Link>
    </footer>
  );
}

export default Footer;
