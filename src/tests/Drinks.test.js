import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import ContextProvider from '../Context/ContextProvider';
import App from '../App';
import fetch from './mocks/fetch';
import { showButton, searchInput, execSearch, searchName, searchLetter, searchIngredient, btnLogin, inputEmail, inputPassword, userEmail, drinkBtn } from './dataBase';

describe('Testa as bebidas', () => {
  global.fetch = fetch;

  jest.spyOn(global, 'fetch');
  it('Testa se é possível pesquisar pelo nome da bebida', async () => {
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

    userEvent.click(screen.getByTestId(drinkBtn));

    const button = screen.getByTestId(showButton);
    userEvent.click(button);
    const search = await screen.findByTestId(searchInput);
    userEvent.type(search, 'gin');
    const radioName = await screen.findByTestId(searchName);
    userEvent.click(radioName);
    const buttonSearch = await screen.findByTestId(execSearch);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin'));
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

    userEvent.click(screen.getByTestId(drinkBtn));

    const button = screen.getByTestId(showButton);
    userEvent.click(button);
    const search = await screen.findByTestId(searchInput);
    userEvent.type(search, 'g');
    const radioName = await screen.findByTestId(searchLetter);
    userEvent.click(radioName);
    const buttonSearch = await screen.findByTestId(execSearch);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g'));
  });

  it('Testa se é possível pesquisar por ingrediente', async () => {
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

    userEvent.click(screen.getByTestId(drinkBtn));

    const button = screen.getByTestId(showButton);
    userEvent.click(button);
    const search = await screen.findByTestId(searchInput);
    userEvent.type(search, 'Light rum');
    const radioName = await screen.findByTestId(searchIngredient);
    userEvent.click(radioName);
    const buttonSearch = await screen.findByTestId(execSearch);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum'));
  });
});
