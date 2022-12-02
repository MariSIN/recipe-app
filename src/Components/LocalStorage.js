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
