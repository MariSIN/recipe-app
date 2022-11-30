import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function RecipeDetails({ title }) {
  const history = useHistory();

  const pathNameId = history.location.pathname;
  console.log(pathNameId);
  const fecthItens = async () => {
    const id = pathNameId.split('/')[2];
    console.log(id);
    if (title === 'Meals') {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    } else {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    }
  };

  useEffect(() => {
    fecthItens();
  }, []);

  return (
    <header>
      <h1>opa</h1>
    </header>
  );
}

RecipeDetails.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RecipeDetails;
