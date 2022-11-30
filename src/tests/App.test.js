import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import ContextProvider from '../Context/ContextProvider';

const placeholderEmail = 'Digite seu email';
const placeholderSenha = 'Digite sua senha';
const email = 'leonardoelias802@gmail.com';

describe('Testes tela de login', () => {
  test('Testando se há os elementos na tela', () => {
    renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,

    );
    expect(screen.getByRole('heading', { name: 'Login', level: 1 }));
    expect(screen.getByRole('button', { name: 'Enter' }));
    expect(screen.getByPlaceholderText(placeholderEmail)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholderSenha)).toBeInTheDocument();
  });

  test('Testando se o botão fica valido ao ao escrever email e senhas corretas', () => {
    renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,

    );
    const button = screen.getByRole('button', { name: 'Enter' });
    const inputEmail = screen.getByPlaceholderText(placeholderEmail);
    const inputSenha = screen.getByPlaceholderText(placeholderSenha);
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, email);
    userEvent.type(inputSenha, '1234567');
    expect(button).not.toBeDisabled();
  });

  test('Testando se o botão fica invalido ao ao escrever email incorreto', () => {
    renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,

    );

    const button = screen.getByRole('button', { name: 'Enter' });
    const inputEmail = screen.getByPlaceholderText(placeholderEmail);
    const inputSenha = screen.getByPlaceholderText(placeholderSenha);

    userEvent.type(inputEmail, 'leonardoelias80gmail.com');
    userEvent.type(inputSenha, '1234567');

    expect(button).toBeDisabled();
  });

  test('Testando se o botão fica invalido ao ao escrever senha incorreta', () => {
    renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,

    );

    const button = screen.getByRole('button', { name: 'Enter' });
    const inputEmail = screen.getByPlaceholderText(placeholderEmail);
    const inputSenha = screen.getByPlaceholderText(placeholderSenha);

    userEvent.type(inputEmail, email);
    userEvent.type(inputSenha, '1234');

    expect(button).toBeDisabled();
  });

  test('Testando se o botão vai na rota certa', () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,

    );

    const button = screen.getByRole('button', { name: 'Enter' });
    const inputEmail = screen.getByPlaceholderText(placeholderEmail);
    const inputSenha = screen.getByPlaceholderText(placeholderSenha);

    userEvent.type(inputEmail, email);
    userEvent.type(inputSenha, '1234567');

    expect(button).not.toBeDisabled();

    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
