import { Link } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import '../style/footer.css';

function Footer() {
  return (
    <footer
      className="footer"
      data-testid="footer"
      style={ { position: 'fixed', bottom: '0px' } }
    >
      <Link to="/meals">
        <GiKnifeFork
          data-testid="meals-bottom-btn"
          alt="mealIcon"
          className="icon-footer"
        />
      </Link>
      <Link to="/drinks">
        <BiDrink
          data-testid="drinks-bottom-btn"
          alt="drinkIcon"
          className="icon-footer"
        />
      </Link>
    </footer>
  );
}

export default Footer;
