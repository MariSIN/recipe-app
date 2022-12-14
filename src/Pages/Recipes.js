import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import ButtonRecipes from '../Components/ButtonRecipes';
import CardRecipes from '../Components/CardRecipes';
import Context from '../Context/Context';
import { DRINK_CATEGORY, MEALS_CATEGORY } from '../utilit/globalVariables';

const maxFood = 12;

function Recipes({ endpoit, chave }) {
  const [food, setFood] = useState([]);
  const { foodFilter, createFilter, isLoading, setIsLoading } = useContext(Context);

  useEffect(() => {
    fetch(endpoit)
      .then((promise) => promise.json())
      .then((data) => setFood(data[chave]));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (food.length !== 0) {
      const novoArray = food.filter((e, i) => i < maxFood);
      createFilter(novoArray, chave);
    }
  }, [food]);
  if (isLoading) { return (<h1>Loading...</h1>); }
  return (
    <>
      <h1 className="title-recipes">Recipes</h1>
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
