import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Details from './Components/Details';
import Drinks from './Pages/Drinks';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/profile" component={ Profile } />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals/:id-meals" component={ Details } />
        <Route path="/drinks/:id-drink" component={ Details } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
