import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import ContextProvider from '../Context/ContextProvider';
import Profile from '../Pages/Profile';

describe('Teste da tela profile', () => {
  test('Testando se todos os elementos estão de forma correta entrar na tela profile', () => {
    renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,

    );
    const buttonEnter = screen.getByRole('button', { name: 'Enter' });
    const inputEmail = screen.getByPlaceholderText('Digite seu email');
    const inputSenha = screen.getByPlaceholderText('Digite sua senha');
    userEvent.type(inputEmail, 'leonardoelias802@gmail.com');
    userEvent.type(inputSenha, '12345678');
    userEvent.click(buttonEnter);
    const buttonProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(buttonProfile);

    expect(screen.getByText('leonardoelias802@gmail.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Done Recipes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Favorite Recipes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Profile', level: 1 })).toBeInTheDocument();
    const icone = screen.getByAltText('profile');
    expect(icone).toBeInTheDocument();
  });

  test('Testando funcionamento do botão Done Recipes', () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <Profile />
        ,
      </ContextProvider>,

    );

    const buttonDones = screen.getByRole('button', { name: 'Done Recipes' });
    userEvent.click(buttonDones);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  test('Testando funcionamento do botão Favorite Recipes', () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <Profile />
        ,
      </ContextProvider>,

    );

    const buttonFavorite = screen.getByRole('button', { name: 'Favorite Recipes' });
    userEvent.click(buttonFavorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  test('Testando funcionamento do botão Logout', () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <Profile />
        ,
      </ContextProvider>,

    );

    const buttonLogout = screen.getByRole('button', { name: 'Logout' });
    userEvent.click(buttonLogout);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
