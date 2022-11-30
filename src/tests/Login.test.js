import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import ContextProvider from '../Context/ContextProvider';

describe('Testa <App />', () => {
  it('Testa se há os elementos na tela', () => {
    renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,

    );
    expect(screen.getByRole('heading', { name: 'Login', level: 1 }));
    expect(screen.getByRole('button', { name: 'Enter' }));
    expect(screen.getByPlaceholderText('Digite seu email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument();
  });

  it('Testa se é possível escrever nos inputs', () => {
    renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,

    );
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');

    userEvent.type(inputEmail, 'nome@nome.com');
    userEvent.type(inputPassword, '1234567');
  });

  it('Testa se o botão é habilitado quando digitado corretamente nos inputs', () => {
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

    expect(buttonPlay).toBeEnabled();
  });
});
