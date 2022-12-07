import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import ContextProvider from '../Context/ContextProvider';
import renderWithRouter from '../renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import { filterByAllFavorites, filterByMealsFavorites, filterByDrinksFavorites,
  routeFavoriteRecipes, btnLogin, inputEmail, inputPassword, userEmail } from './dataBase';

describe('Testa as bebidas', () => {
  global.fetch = fetch;

  jest.spyOn(global, 'fetch');
  it('Testa existe um título na página', () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,
    );

    act(() => history.push(routeFavoriteRecipes));

    expect(screen.getByRole('heading', { name: 'Favorite Recipes' })).toBeInTheDocument();
  });

  it('Testa exite botões de filtro', () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,
    );

    act(() => history.push(routeFavoriteRecipes));
    expect(screen.getByTestId(filterByAllFavorites)).toBeInTheDocument();
    expect(screen.getByTestId(filterByMealsFavorites)).toBeInTheDocument();
    expect(screen.getByTestId(filterByDrinksFavorites)).toBeInTheDocument();
  });

  it.skip('Testa se existe um botão de desfavoritar', async () => {
    renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,
    );
    const login = screen.getByTestId(btnLogin);

    const email = screen.getByTestId(inputEmail);
    const password = screen.getByTestId(inputPassword);

    userEvent.type(email, userEmail);
    userEvent.type(password, '1234567');
    userEvent.click(login);

    const corba = await screen.findByTestId('0-card-name');
    userEvent.click(corba);
  });
});
