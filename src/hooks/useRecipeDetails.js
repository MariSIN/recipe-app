import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MAX_RECOM_VALUE } from '../utilit/globalVariables';

const copy = require('clipboard-copy');

function useRecipeDetails() {
  const [recipe, setRecipe] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [continueRecipes, setContinueRecipes] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);

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

  const inProgressRecipe = () => {
    const savedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (path === 'meals') {
      history.push(`/meals/${id}/in-progress`);

      const newSavedMeal = {
        meals: {
          ...savedRecipes.meals,
          [id]: ingredient,
        },
        drinks: {
          ...savedRecipes.drinks,
        },
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(newSavedMeal));
      setContinueRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
    } else {
      history.push(`/drinks/${id}/in-progress`);

      const newSavedDrinks = {
        meals: {
          ...savedRecipes.meals,
        },
        drinks: {
          ...savedRecipes.drinks,
          [id]: ingredient,
        },
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(newSavedDrinks));
      setContinueRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
  };

  useEffect(() => {
    fetchItems();

    const savedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!savedRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {

        },
        meals: {
        },
      }));
    }
    setContinueRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
  }, []);

  useEffect(() => {
    if (continueRecipes !== undefined && path === 'meals') {
      const verify = Object.keys(continueRecipes.meals).includes(id);
      setIsSaved(verify);
    }
    if (continueRecipes !== undefined && path === 'drinks') {
      const verify = Object.keys(continueRecipes.drinks).includes(id);
      setIsSaved(verify);
    }
  }, [continueRecipes]);

  useEffect(() => {
    if (recipe[0]) {
      const recipeIngredient = Object.entries(recipe[0])
        .filter((i) => i[0].includes('strIngredient'))
        .filter((i) => i[1] !== null && i[1] !== '')
        .map((i) => i[1]);
      setIngredient(recipeIngredient);

      const recipeMeasure = Object.entries(recipe[0])
        .filter((i) => i[0].includes('strMeasure'))
        .filter((i) => i[1] !== '' && i[1] !== null)
        .map((i) => i[1]);
      setMeasure(recipeMeasure);
    }

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (path === 'meals') {
      const isFavorite = favorites?.some((i) => i.id === recipe[0]?.idMeal);
      setIsFav(isFavorite);
    } else {
      const isFavorite = favorites?.some((i) => i.id === recipe[0]?.idDrink);
      setIsFav(isFavorite);
    }
  }, [recipe]);

  const copyLink = (() => {
    copy(`http://localhost:3000${pathNameId}`);
    setIsCopied(true);
  });

  return {
    recipe,
    recomendations,
    id,
    setContinueRecipes,
    continueRecipes,
    isSaved,
    ingredient,
    measure,
    inProgressRecipe,
    copyLink,
    isCopied,
    setIsFav,
    isFav,
  };
}

export default useRecipeDetails;
