import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiMeal } from 'react-icons/gi';
import ButtonRecipes from '../Components/ButtonRecipes';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Show from '../Components/Show';
import Context from '../Context/Context';
import '../style/meals.css';
import '../style/header.css';
import { MEALS_CATEGORY, MEALS_RECIPES } from '../utilit/globalVariables';
import Recipes from './Recipes';

function Meals() {
  const [recipes, setRecipes] = useState([]);
  const { searchResult, showSearch } = useContext(Context);

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
      <header className="header">
        <Header title="Meals" />
      </header>
      <Show title="Meals" />
      <GiMeal className="icon-title-meals" />
      <h1 className="title-recipes">Meals</h1>
      <div className="meals-column">
        {!showSearch ? (
          <div className="all-recipes-card">
            <Recipes
              endpoit={ MEALS_RECIPES }
              chave="meals"
            />
          </div>
        ) : (
          <div className="all">
            <ButtonRecipes
              endpoit={ MEALS_CATEGORY }
              chave="meals"
              className="buttons-filter"
            />
            <div className="all-meals">
              <div className="all-content">
                {recipes?.map((recipe, index) => (
                  <div key={ index } className="map-meals-container card-recipe">
                    <Link
                      to={ `/meals/${recipe.idMeal}` }
                      key={ recipe.idMeal }
                      className="link-meals"
                    >
                      <div
                        data-testid={ `${index}-recipe-card` }
                        className="meals-card"
                      >
                        <h2
                          data-testid={ `${index}-card-name` }
                          className="text-name"
                        >
                          {recipe.strMeal}
                        </h2>
                        <img
                          data-testid={ `${index}-card-img` }
                          src={ recipe.strMealThumb }
                          alt={ recipe.strMeal }
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
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
