import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import ContextProvider from '../Context/ContextProvider';
import App from '../App';
import fetch from './mocks/fetch';
import { showButton, searchInput, execSearch, searchLetter, searchIngredient, drinkBtn, searchName } from './dataBase';

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

    const buttonPlay = screen.getByTestId('login-submit-btn');

    expect(buttonPlay).toBeDisabled();

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');

    userEvent.type(inputEmail, 'nome@nome.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonPlay);

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
