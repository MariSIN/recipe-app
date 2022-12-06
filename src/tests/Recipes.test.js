import { screen } from '@testing-library/react';
import React from 'react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
import ContextProvider from '../Context/ContextProvider';
import renderWithRouter from '../renderWithRouter';
// import Meals from '../Pages/Meals';
// import { meals } from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import Recipes from '../Pages/Recipes';
// import { placeholderEmail, placeholderSenha, email } from './dataBase';

describe('Testando pagina Recipes parte Meals', () => {
  test('testando se há os botão na pagina meals,', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    renderWithRouter(
      <ContextProvider>
        <Recipes />
        ,
      </ContextProvider>,
      '/meals',
    );
    const bottaoALL = screen.getByTestId('All-category-filter');
    expect(bottaoALL).toBeInTheDocument();
    // userEvent.click(bottaoALL);
    // const botaoBeef = findByTestId('Beef-category-filter');
    const titulo = screen.getByRole('heading', { name: 'Recipes', level: 1 });
    expect(titulo).toBeInTheDocument();
  });
});
