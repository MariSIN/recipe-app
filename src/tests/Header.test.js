import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import ContextProvider from '../Context/ContextProvider';
import { btnLogin, inputEmail, inputPassword, searchInput, showButton, userEmail } from './dataBase';

describe('Testa <Header />', () => {
  it('Testa se é renderizado um elemento <h1> na tela', () => {
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

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('Testa se é renderizado um botão que mostra e esconde um input', () => {
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

    const buttonShow = screen.getByTestId(showButton);
    expect(buttonShow).toBeInTheDocument();

    userEvent.click(buttonShow);

    expect(screen.getByTestId(searchInput)).toBeInTheDocument();

    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();

    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();

    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();

    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
  });

  it('Testa se é possível escrever no input', () => {
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

    const buttonShow = screen.getByTestId('search-top-btn');
    expect(buttonShow).toBeInTheDocument();

    userEvent.click(buttonShow);

    const search = screen.getByTestId(searchInput);

    userEvent.type(search, 'chicken');
  });

  it('Testa se é renderizado um ícone que redireciona para a página profile', () => {
    const { history } = renderWithRouter(
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

    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });
});
