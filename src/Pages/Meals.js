import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Show from '../Components/Show';
import Context from '../Context/Context';
import { MEALS_RECIPES } from '../utilit/globalVariables';
import Recipes from './Recipes';
import '../style/meals.css';

function Meals() {
  const [recipes, setRecipes] = useState([]);
  const { searchResult } = useContext(Context);

  useEffect(() => {
    const maxRender = 11;
    if (searchResult === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (searchResult?.length > maxRender) {
      const top12 = searchResult.filter((item, index) => index <= maxRender);
      setRecipes(top12);
    } else {
      setRecipes(searchResult);
    }
  }, [searchResult]);

  return (
    <div className="content-meals">
      <Header title="Meals" />
      <Show title="Meals" />
      <div className="meals-column">
        <Recipes endpoit={ MEALS_RECIPES } chave="meals" />
        {recipes?.map((recipe, index) => (
          <div key={ index } className="map-meals-container card-recipe">
            <Link
              to={ `/meals/${recipe.idMeal}` }
              key={ recipe.idMeal }
              className="link-meals"
            >
              <div
                data-testid={ `${index}-recipe-card` }
                className="meals-card meals-column"
              >
                <h2
                  data-testid={ `${index}-card-name` }
                  className="card-name text-name"
                >
                  {recipe.strMeal}
                </h2>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  style={ { maxWidth: '200px' } }
                  className="card-img"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
