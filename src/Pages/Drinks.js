import { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import Show from '../Components/Show';
import Context from '../Context/Context';

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const { searchResult } = useContext(Context);

  useEffect(() => {
    const maxRender = 11;
    if (searchResult === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (searchResult.length > maxRender) {
      const top12 = searchResult.filter((item, index) => index <= maxRender);
      setDrinks(top12);
    } else {
      setDrinks(searchResult);
    }
  }, [searchResult]);

  return (
    <>
      <Header title="Drinks" />
      <Show title="Drinks" />
      {drinks.map((drink, index) => (
        <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
          <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            style={ { maxWidth: '200px' } }
          />
        </div>
      ))}
    </>
  );
}

export default Drinks;
