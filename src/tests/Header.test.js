import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Components/Header';
import renderWithRouter from '../renderWithRouter';
import ContextProvider from '../Context/ContextProvider';

describe('Testa <Header />', () => {
  it('Testa se é renderizado um elemento <h1> na tela', () => {
    renderWithRouter(
      <ContextProvider>
        <Header />
        ,
      </ContextProvider>,
    );
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('Testa se é renderizado um botão que mostra e esconde um input', () => {
    renderWithRouter(
      <ContextProvider>
        <Header />
        ,
      </ContextProvider>,
    );
    const buttonShow = screen.getByTestId('search-top-btn');
    expect(buttonShow).toBeInTheDocument();

    userEvent.click(buttonShow);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();

    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();

    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();

    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
  });

  it('Testa se é possível escrever no input', () => {
    renderWithRouter(
      <ContextProvider>
        <Header />
        ,
      </ContextProvider>,

    );

    const buttonShow = screen.getByTestId('search-top-btn');
    expect(buttonShow).toBeInTheDocument();

    userEvent.click(buttonShow);

    const searchInput = screen.getByTestId('search-input');

    userEvent.type(searchInput, 'chicken');
  });

  it('Testa se é renderizado um ícone que redireciona para a página profile', () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <Header />
        ,
      </ContextProvider>,
    );

    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });
});
