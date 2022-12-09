import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import ContextProvider from '../Context/ContextProvider';
import renderWithRouter from '../renderWithRouter';
import { btnLogin, execSearch, inputEmail, inputPassword, searchInput, searchName, showButton, userEmail } from './dataBase';

describe('Testa as receitas', () => {
  beforeEach(() => {
    global.fetch = fetch;
    jest.spyOn(global, 'fetch');
  });

  it('Testa se é possível pesquisar por nome da receita', async () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,

    );
    const { pathname } = history.location;
    const login = screen.getByTestId(btnLogin);

    const email = screen.getByTestId(inputEmail);
    const password = screen.getByTestId(inputPassword);

    userEvent.type(email, userEmail);

    userEvent.type(password, '1234567');
    userEvent.click(login);
    const button = screen.getByTestId(showButton);
    userEvent.click(button);
    const input = await screen.findByTestId(searchInput);
    userEvent.type(input, 'Arrabiata');
    const radioName = await screen.findByTestId(searchName);
    userEvent.click(radioName);
    const buttonSearch = await screen.findByTestId(execSearch);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'), { timeout: 3000 });
    // await waitFor(() => expect(pathname).toBe('/meals/52771'));
  });
});
