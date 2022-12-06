import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardRecipes from '../Components/CardRecipes';
import ButtonRecipes from '../Components/ButtonRecipes';
import { MEALS_CATEGORY, DRINK_CATEGORY } from '../utilit/globalVariables';
import Context from '../Context/Context';

const maxFood = 12;

function Recipes({ endpoit, chave }) {
  const [food, setFood] = useState([]);
  const { foodFilter, createFilter } = useContext(Context);
  useEffect(() => {
    fetch(endpoit)
      .then((promise) => promise.json())
      .then((data) => setFood(data[chave]));
  }, []);

  useEffect(() => {
    if (food.length !== 0) {
      const novoArray = food.filter((e, i) => i < maxFood);
      createFilter(novoArray);
    }
  }, [food]);
  return (
    <>
      <h1>Recipes</h1>
      {(chave === 'meals') ? (
        <>
          <ButtonRecipes endpoit={ MEALS_CATEGORY } chave="meals" />
          {foodFilter.map((e, i) => (
            <CardRecipes
              key={ i }
              img={ e.strMealThumb }
              name={ e.strMeal }
              index={ i }
              id={ e.idMeal }
              rota="meals"
            />))}
        </>

      ) : (
        <>
          <ButtonRecipes endpoit={ DRINK_CATEGORY } chave="drinks" />
          {foodFilter.map((e, i) => (
            <CardRecipes
              key={ i }
              img={ e.strDrinkThumb }
              name={ e.strDrink }
              index={ i }
              id={ e.idDrink }
              rota="drinks"
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
