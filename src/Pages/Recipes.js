import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardRecipes from '../Components/CardRecipes';

const maxFood = 12;

function Recipes({ endpoit, chave }) {
  const [food, setFood] = useState([]);
  const [foodFilter, setFoodFilter] = useState([]);
  useEffect(() => {
    fetch(endpoit)
      .then((promise) => promise.json())
      .then((data) => setFood(data[chave]));
  }, []);

  useEffect(() => {
    if (food.length !== 0) {
      const novoArray = food.filter((e, i) => i < maxFood);
      setFoodFilter(novoArray);
    }
  }, [food]);
  return (
    <>
      <h1>Recipes</h1>
      {(chave === 'meals') ? (
        <>
          {foodFilter.map((e, i) => (
            <CardRecipes
              key={ i }
              img={ e.strMealThumb }
              name={ e.strMeal }
              index={ i }
            />))}
        </>

      ) : (
        <>
          {foodFilter.map((e, i) => (
            <CardRecipes
              key={ i }
              img={ e.strDrinkThumb }
              name={ e.strDrink }
              index={ i }
            />))}
        </>

      )}

    </>

  );
}

Recipes.propTypes = {
  chave: PropTypes.string.isRequired,
  endpoit: PropTypes.string.isRequired,
};

export default Recipes;
