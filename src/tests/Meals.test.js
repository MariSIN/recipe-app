import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import ContextProvider from '../Context/ContextProvider';
import renderWithRouter from '../renderWithRouter';
import { btnLogin, execSearch, inputEmail, inputPassword, searchIngredient, searchInput, searchLetter, searchName, showButton, userEmail } from './dataBase';

describe('Testa as receitas', () => {
  beforeEach(() => {
    global.fetch = fetch;
    jest.spyOn(global, 'fetch');
  });

  it('Testa se é possível pesquisar por nome da receita', async () => {
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

    const button = screen.getByTestId(showButton);
    userEvent.click(button);
    const input = await screen.findByTestId(searchInput);
    userEvent.type(input, 'Beef');
    const radioName = await screen.findByTestId(searchName);
    userEvent.click(radioName);
    const buttonSearch = await screen.findByTestId(execSearch);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Beef'));
  });

  it('Testa se é possível pesquisar por letra inicial da receita', async () => {
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

    const button = screen.getByTestId(showButton);
    userEvent.click(button);
    const search = await screen.findByTestId(searchInput);
    userEvent.type(search, 's');
    const radioName = await screen.findByTestId(searchLetter);
    userEvent.click(radioName);
    const buttonSearch = await screen.findByTestId(execSearch);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=s'));
  });

  it('Testa se é possível pesquisar por ingrediente da receita', async () => {
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

    const button = screen.getByTestId(showButton);
    userEvent.click(button);
    const search = await screen.findByTestId(searchInput);
    userEvent.type(search, 'Chicken');
    const radioName = await screen.findByTestId(searchIngredient);
    userEvent.click(radioName);
    const buttonSearch = await screen.findByTestId(execSearch);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken'));
  });
});
