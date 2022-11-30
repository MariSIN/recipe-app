import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" style={ { position: 'fixed', bottom: '0px' } }>
      <img data-testid="meals-bottom-btn" src={ mealIcon } alt="mealIcon" />
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinkIcon" />
    </footer>
  );
}

export default Footer;
