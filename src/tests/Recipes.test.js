import { screen } from '@testing-library/react';
import React from 'react';
import ContextProvider from '../Context/ContextProvider';
import renderWithRouter from '../renderWithRouter';
import mealCategories from '../../cypress/mocks/mealCategories';
import Recipes from '../Pages/Recipes';
import { DRINK_RECIPES, MEALS_RECIPES } from '../utilit/globalVariables';
import drinkCategories from '../../cypress/mocks/drinkCategories';

describe('Testando pagina Recipes parte Meals', () => {
  test('testando se há os botão na pagina meals,', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    renderWithRouter(
      <ContextProvider>
        <Recipes endpoit={ MEALS_RECIPES } chave="meals" />
      </ContextProvider>,

    );
    const bottaoALL = screen.getByTestId('All-category-filter');
    expect(bottaoALL).toBeInTheDocument();
    const titulo = screen.getByRole('heading', { name: 'Recipes', level: 1 });
    expect(titulo).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Beef' })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Breakfast' })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Chicken' })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Goat' })).toBeInTheDocument();
  });
});

describe('Testando pagina Recipes parte Drink', () => {
  test('testando se há os botão na pagina drinks,', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });
    renderWithRouter(
      <ContextProvider>
        <Recipes endpoit={ DRINK_RECIPES } chave="drinks" />
      </ContextProvider>,

    );
    const bottaoALL = screen.getByTestId('All-category-filter');
    expect(bottaoALL).toBeInTheDocument();
    const titulo = screen.getByRole('heading', { name: 'Recipes', level: 1 });
    expect(titulo).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Ordinary Drink' })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Cocktail' })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Shake' })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Other/Unknown' })).toBeInTheDocument();
  });
});
