import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import ContextProvider from '../Context/ContextProvider';
import renderWithRouter from '../renderWithRouter';
import { doneRecipes, routeDoneRecipes } from './dataBase';

describe('Done Recipes', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });
  global.execCommand = jest.fn();

  afterEach(() => localStorage.clear());

  it('Testa se os elementos estão na tela', () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
    );
    act(() => history.push(routeDoneRecipes));

    const drinkImage = screen.getByRole('img', { name: /gg/i });
    expect(drinkImage).toBeDefined();

    const drinkName = screen.getByRole('heading', { name: /gg/i });
    expect(drinkName).toBeDefined();

    const drinkCategory = screen.getByText(/optional alcohol/i);
    expect(drinkCategory).toBeDefined();

    const drinkDate = screen.getByTestId('0-horizontal-done-date');
    expect(drinkDate).toBeDefined();

    const drinkShare = screen.getByTestId('0-horizontal-share-btn');
    expect(drinkShare).toBeDefined();

    const mealImage = screen.getByRole('img', { name: /corba/i });
    expect(mealImage).toBeDefined();

    const mealName = screen.getByRole('heading', { name: /corba/i });
    expect(mealName).toBeDefined();

    const mealNationality = screen.getByText(/turkish - side/i);
    expect(mealNationality).toBeDefined();

    const mealDate = screen.getByTestId('1-horizontal-done-date');
    expect(mealDate).toBeDefined();

    const mealShare = screen.getByTestId('1-horizontal-share-btn');
    expect(mealShare).toBeDefined();

    const mealCategory = screen.getByText(/soup/i);
    expect(mealCategory).toBeDefined();
  });
  it('Testa o botao de compartilhar', async () => {
    let copy;
    global.navigator.clipboard = {
      writeText: jest.fn((result) => { copy = result; }),
    };
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
    );
    act(() => history.push(routeDoneRecipes));

    const drinkShare = screen.queryByTestId('0-horizontal-share-btn');
    userEvent.click(drinkShare);
    expect(copy).toContain('http://localhost:3000/drinks/15997');
  });
  it('Testa os filtros', () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
    );
    act(() => history.push(routeDoneRecipes));

    const filterMeal = screen.getByRole('button', { name: /meals/i });
    userEvent.click(filterMeal);
    expect(screen.queryByRole('heading', { name: /gg/i })).not.toBeInTheDocument();

    const filterDrink = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(filterDrink);
    expect(screen.queryByRole('img', { name: /corba/i })).not.toBeInTheDocument();

    const filterAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(filterAll);
    expect(screen.getAllByRole('img', { name: /shareicon/i }).length).toBe(2);

    screen.logTestingPlaygroundURL();
  });
});
