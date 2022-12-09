import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ContextProvider from '../Context/ContextProvider';
import Meals from '../Pages/Meals';
import renderWithRouter from '../renderWithRouter';

describe('RecipeInProgress', () => {
  beforeEach(() => {
    global.fetch = fetch;
    jest.spyOn(global, 'fetch');
  });
  it('Testa a rota de Progresso', async () => {
    const { history } = renderWithRouter(
      <ContextProvider>
        <Meals />
      </ContextProvider>,
    );

    act(() => {
      history.push('/meals/52977');
    });

    await waitFor(() => screen.findByText('Corba'));
    screen.logTestingPlaygroundURL();
  });
});
