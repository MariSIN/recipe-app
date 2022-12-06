export const notEmptyLocalStorage = (setContinueRecipes) => {
  const savedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!savedRecipes) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        drinks: {},
        meals: {},
      }),
    );
  }
  setContinueRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
};

export const notUndefinedLocalStorage = (continueRecipes, title, id, setIsSaved) => {
  if (continueRecipes !== undefined && title === 'Meals') {
    const verify = Object.keys(continueRecipes.meals).includes(id);
    setIsSaved(verify);
  }
  if (continueRecipes !== undefined && title === 'Drinks') {
    const verify = Object.keys(continueRecipes.drinks).includes(id);
    setIsSaved(verify);
  }
};

const mealObj = (recipe) => ({
  id: recipe[0].idMeal,
  type: 'meal',
  nationality: recipe[0].strArea,
  category: recipe[0].strCategory,
  alcoholicOrNot: '',
  name: recipe[0].strMeal,
  image: recipe[0].strMealThumb,
});

const drinkObj = (recipe) => ({
  id: recipe[0].idDrink,
  type: 'drink',
  nationality: '',
  category: recipe[0].strCategory,
  alcoholicOrNot: recipe[0].strAlcoholic,
  name: recipe[0].strDrink,
  image: recipe[0].strDrinkThumb,
});

export const favoriteLocalStorage = (recipe, title, setIsFav) => {
  const favoritedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const isFavMeal = favoritedRecipes?.some((i) => i.id === recipe[0].idMeal);
  const isFavDrink = favoritedRecipes?.some((i) => i.id === recipe[0].idDrink);

  if (!favoritedRecipes) {
    if (title === 'Meals') {
      localStorage.setItem('favoriteRecipes', JSON.stringify([mealObj(recipe)]));
      setIsFav(true);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([drinkObj(recipe)]));
      setIsFav(true);
    }
  } else if (title === 'Meals') {
    if (isFavMeal) {
      const favFiltered = favoritedRecipes.filter((i) => i.id !== mealObj(recipe).id);
      setIsFav(false);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favFiltered));
    } else {
      localStorage
        .setItem(
          'favoriteRecipes',
          JSON.stringify([...favoritedRecipes, mealObj(recipe)]),
        );
      setIsFav(true);
    }
  } else if (isFavDrink) {
    const favFiltered = favoritedRecipes.filter((i) => i.id !== drinkObj(recipe).id);
    setIsFav(false);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favFiltered));
  } else {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...favoritedRecipes, drinkObj(recipe)]),
    );
    setIsFav(true);
  }
};
