import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipeDetails from './Components/RecipeDetails';
import RecipeInProgress from './Components/RecipeInProgress';
import DoneRecipes from './Pages/DoneRecipes';
import Drinks from './Pages/Drinks';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Profile from './Pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        path="/meals/:id"
        render={ () => <RecipeDetails title="Meals" /> }
      />
      <Route
        path="/drinks/:id"
        render={ () => <RecipeDetails title="Drinks" /> }
      />
      <Route
        path="/meals/:id/in-progress"
        render={ () => <RecipeInProgress title="Meals" /> }
      />
      <Route
        path="/drinks/:id/in-progress"
        render={ () => <RecipeInProgress title="Meals" /> }
      />
      <Route path="/meals" component={ Meals } />
      <Route path="/profile" component={ Profile } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
