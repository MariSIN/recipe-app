import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import ContextProvider from '../Context/ContextProvider';
import App from '../App';
import fetch from './mocks/fetch';
import { showButton, searchInput, execSearch, searchName, searchLetter, searchIngredient } from './dataBase';

describe('Testa as receitas', () => {
  global.fetch = fetch;

  jest.spyOn(global, 'fetch');

  afterEach(() => jest.clearAllMocks());

  it('Testa se é possível pesquisar por nome da receita', async () => {
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
