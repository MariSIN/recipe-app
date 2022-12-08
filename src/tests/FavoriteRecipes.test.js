import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import ContextProvider from '../Context/ContextProvider';
import renderWithRouter from '../renderWithRouter';
import { filterByAllFavorites, filterByMealsFavorites, filterByDrinksFavorites,
  routeFavoriteRecipes, localStorageFavoriteRecipes, btnShare } from './dataBase';

describe('Testa as bebidas', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageFavoriteRecipes));
  });

  global.execCommand = jest.fn();

  afterEach(() => localStorage.clear());
  it('Testa existe um título na página', () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,
    );

    act(() => history.push(routeFavoriteRecipes));

    expect(screen.getByRole('heading', { name: 'Favorite Recipes' })).toBeInTheDocument();
  });

  it('Testa exite botões de filtro', () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,
    );

    act(() => history.push(routeFavoriteRecipes));
    expect(screen.getByTestId(filterByAllFavorites)).toBeInTheDocument();
    expect(screen.getByTestId(filterByMealsFavorites)).toBeInTheDocument();
    expect(screen.getByTestId(filterByDrinksFavorites)).toBeInTheDocument();
  });

  it('Testa se as receitas estão exibidas na tela', async () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,
    );
    act(() => history.push(routeFavoriteRecipes));
    expect(await screen.findByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(await screen.findByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(await screen.findByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(await screen.findByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(await screen.findByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(await screen.findByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(await screen.findByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
    expect(await screen.findByTestId(btnShare)).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de desfavoritar o elemento some', async () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,
    );
    act(() => history.push(routeFavoriteRecipes));
    const btnFavorite = await screen.findByTestId('1-horizontal-favorite-btn');
    const recipeDrink = await screen.findByTestId('1-horizontal-top-text');
    userEvent.click(btnFavorite);
    await waitFor(() => expect(recipeDrink).not.toBeInTheDocument());
  });

  it('Testa o filtro meals', async () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,
    );
    act(() => history.push(routeFavoriteRecipes));
    const filterMeals = screen.queryByTestId('filter-by-meal-btn');
    userEvent.click(filterMeals);
    expect(await screen.queryByRole('heading', { name: /gg/i, level: 4 })).not.toBeInTheDocument();
  });

  it('Testa o filtro drinks', async () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,
    );
    act(() => history.push(routeFavoriteRecipes));
    const filterDrinks = screen.queryByTestId('filter-by-drink-btn');
    userEvent.click(filterDrinks);
    expect(await screen.queryByRole('heading', { name: /corba/i, level: 4 })).not.toBeInTheDocument();
  });

  it('Testa o filtro all', async () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
        ,
      </ContextProvider>,
    );
    act(() => history.push(routeFavoriteRecipes));
    const noFilter = screen.queryByTestId('filter-by-all-btn');
    userEvent.click(noFilter);
    expect(await screen.queryByRole('heading', { name: /corba/i, level: 4 })).toBeInTheDocument();
    expect(await screen.queryByRole('heading', { name: /gg/i, level: 4 })).toBeInTheDocument();
  });
  it('Testa o clipboard', async () => {
    let clipboardData;
    global.navigator.clipboard = {
      writeText: jest.fn((data) => { clipboardData = data; }),
    };

    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
    );
    act(() => history.push(routeFavoriteRecipes));

    const drinkShare = screen.getByTestId(btnShare);
    userEvent.click(drinkShare);
    expect(clipboardData).toContain('http://localhost:3000/meals/52977');
  });
  it('Testa se ao clicar no clipboard aparece um texto "Link copied!"', async () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
    );
    act(() => history.push(routeFavoriteRecipes));

    const drinkShare = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(drinkShare);
    expect(await screen.findByText('Link copied!')).toBeInTheDocument();
  });
  it('Testa se depois de um tempo o texto "Link copied!" some', async () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
    );
    act(() => history.push(routeFavoriteRecipes));

    const drinkShare = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(drinkShare);
    const linkCopied = await screen.findByText('Link copied!');
    expect(linkCopied).toBeInTheDocument();
    await waitForElementToBeRemoved(linkCopied, { timeout: 4000 });
  });
});
