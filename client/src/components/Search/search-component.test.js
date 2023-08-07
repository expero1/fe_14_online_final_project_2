import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import '@testing-library/jest-dom';
import { cleanup, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import store from '../../redux/store';
import theme from '../../themes/theme';
import Search from './index';
import mockProducts from './searchMockProducts';
// import { expect } from '@jest/globals';
// import { beforeEach } from 'node:test';

jest.setTimeout(10000);
function MockSearch() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

const server = setupServer(
  rest.get('/api/products', (req, res, ctx) => res(ctx.json(mockProducts)))
);
const toggleSearchInput = () => {
  const searchButton = screen.getByRole('button');
  act(() => {
    userEvent.click(searchButton);
  });
};
const checkQuantityByRole = async (elementRole, expectedQuantity) =>
  expect(await screen.findAllByRole(elementRole)).toHaveLength(
    expectedQuantity
  );
const typeToInput = (inputElement, typeWord) =>
  act(() => {
    userEvent.type(inputElement, typeWord);
  });
const clearSearchInput = (searchInput) =>
  act(() => {
    userEvent.clear(searchInput);
  });

beforeAll(() => server.listen());
beforeEach(() => {
  render(<MockSearch />);
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
describe('Search component', () => {
  test('Component renders', async () => {
    expect(screen.getAllByRole('button').length).toEqual(1);
    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
  });

  test('Search input opens and closes', async () => {
    toggleSearchInput();
    const searchInput = await screen.findByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    toggleSearchInput();
    expect(searchInput).not.toBeInTheDocument();
    toggleSearchInput();
  });
  test('Search result card renders', async () => {
    const searchInput = await screen.findByRole('textbox');
    typeToInput(searchInput, 'name 2');
    await checkQuantityByRole('link', 1);
    await checkQuantityByRole('img', 1);
    toggleSearchInput();
  });
  test('Check search results by product name', async () => {
    toggleSearchInput();
    // screen.debug();
    const searchInput = await screen.findByRole('textbox');
    clearSearchInput(searchInput);
    typeToInput(searchInput, 'name');
    await checkQuantityByRole('link', 3);
    clearSearchInput(searchInput);
    expect(screen.queryAllByRole('link').length).toEqual(0);
    typeToInput(searchInput, 'name 1');
    await checkQuantityByRole('link', 1);
    toggleSearchInput();
  });
  test('Search by brand', async () => {
    toggleSearchInput();
    const searchInput = await screen.findByRole('textbox');
    clearSearchInput(searchInput);
    typeToInput(searchInput, 'brand');
    await checkQuantityByRole('link', 3);
    clearSearchInput(searchInput);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    typeToInput(searchInput, 'brand 1');
    await checkQuantityByRole('link', 1);
  });
});
