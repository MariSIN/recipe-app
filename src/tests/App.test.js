import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import ContextProvider from '../Context/ContextProvider';

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
    expect(screen.getByPlaceholderText('Digite seu email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument();
  });
});
