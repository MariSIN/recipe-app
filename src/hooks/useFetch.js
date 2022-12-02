import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MAX_RECOM_VALUE } from '../utilit/globalVariables';

function useFetch() {
  const [recipe, setRecipe] = useState([]);
  const [recomendations, setRecomendations] = useState([]);

  const history = useHistory();

  const pathNameId = history.location.pathname;
  const path = pathNameId.split('/')[1];
  const id = pathNameId.split('/')[2];

  const fetchItems = async () => {
    if (path === 'meals') {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data.meals);

      const url2 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response2 = await fetch(url2);
      const data2 = await response2.json();
      setRecomendations(data2.drinks.slice(0, MAX_RECOM_VALUE));
    } else {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data.drinks);

      const url2 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response2 = await fetch(url2);
      const data2 = await response2.json();
      setRecomendations(data2.meals.slice(0, MAX_RECOM_VALUE));
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  return {
    recipe,
    recomendations,
  };
}

export default useFetch;
