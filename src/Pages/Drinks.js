import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonRecipes from '../Components/ButtonRecipes';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Show from '../Components/Show';
import Context from '../Context/Context';
import '../style/meals.css';
import { DRINK_CATEGORY, DRINK_RECIPES } from '../utilit/globalVariables';
import Recipes from './Recipes';

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const { searchResult, showSearch } = useContext(Context);

  useEffect(() => {
    const maxRender = 11;
    if (searchResult === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (searchResult.length > maxRender) {
      const top12 = searchResult.filter((item, index) => index <= maxRender);
      setDrinks(top12);
    } else {
      setDrinks(searchResult);
    }
  }, [searchResult]);

  return (
    <div className="content-meals">
      <Header title="Drinks" />
      <Show title="Drinks" />
      <div className="meals-column">
        {!showSearch ? (
          <div className="all-recipes-card">
            <Recipes endpoit={ DRINK_RECIPES } chave="drinks" />
          </div>
        ) : (
          <div className="all">
            <ButtonRecipes endpoit={ DRINK_CATEGORY } chave="drinks" />
            <div className="all-meals">
              <div className="all-content">
                {drinks.map((drink, index) => (
                  <div key={ index } className="map-meals-container card-recipe">
                    <Link
                      to={ `/drinks/${drink.idDrink}` }
                      key={ drink.idDrink }
                      className="link-meals"
                    >
                      <div data-testid={ `${index}-recipe-card` } className="meals-card">
                        <h2
                          data-testid={ `${index}-card-name` }
                          className="text-name"
                        >
                          {drink.strDrink}
                        </h2>
                        <img
                          data-testid={ `${index}-card-img` }
                          src={ drink.strDrinkThumb }
                          alt={ drink.strDrink }
                          style={ { maxWidth: '200px' } }
                          className="card-img"
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Drinks;
