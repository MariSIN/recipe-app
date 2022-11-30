import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Show from '../Components/Show';
import Context from '../Context/Context';

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
    <>
      <Header title="Meals" />
      <Show title="Meals" />
      {recipes?.map((recipe, index) => (
        <Link to={ `/meals/${recipe.idMeal}` } key={ recipe.idMeal }>
          <div data-testid={ `${index}-recipe-card` }>
            <h2 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h2>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              style={ { maxWidth: '200px' } }
            />
          </div>
        </Link>
      ))}
      <Footer />
    </>
  );
}

export default Meals;
