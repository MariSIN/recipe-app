import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import ContextProvider from '../Context/ContextProvider';
import Meals from '../Pages/Meals';
import meals from '../../cypress/mocks/meals';

describe('Testando pagina Recipes', () => {
  test('testando se há os botão na pagina meals,', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    renderWithRouter(
      <ContextProvider>
        <Meals />
        ,
      </ContextProvider>,

    );
  });
});
