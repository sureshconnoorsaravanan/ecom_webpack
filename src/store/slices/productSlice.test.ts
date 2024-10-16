import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import productReducer, { fetchProducts, ProductState } from './productSlice';
import { AppDispatch } from '../store';

const mockProducts = {
  nonProd: [
    { 
      id: 1, 
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", 
      category: "men's clothing", 
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" 
    }
  ],
  prod: [
    {
      id: 1,
      title: "Essence Mascara Lash Princess",
      description: "Popular mascara known for its volumizing effects.",
      category: "beauty",
      images: ["https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"],
    }
  ]
};

interface TestState {
  products: ProductState;
}

describe('productSlice', () => {
  let mock: MockAdapter;
  let store: ReturnType<typeof configureStore<TestState>>;
  let dispatch: AppDispatch;

  const initialState: ProductState = { 
    products: [], 
    isLoading: false, 
    error: null 
  };

  const setupStore = () => configureStore<TestState>({ reducer: { products: productReducer } });

  const mockFetch = (url: string, data: any, status = 200) => {
    mock.onGet(url).reply(status, data);
  };

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = setupStore();
    dispatch = store.dispatch;
  });

  afterEach(() => mock.reset());

  it('should return the initial state when called with an unknown action', () => {
    expect(productReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type };
    const expectedState = { ...initialState, isLoading: true };
    expect(productReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchProducts.fulfilled with products array', () => {
    const action = { 
      type: fetchProducts.fulfilled.type, 
      payload: [{ id: 1, title: 'Product 1' }, { id: 2, title: 'Product 2' }] 
    };
    const expectedState = { ...initialState, isLoading: false, products: action.payload };
    expect(productReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchProducts.fulfilled with products object', () => {
    const action = { 
      type: fetchProducts.fulfilled.type, 
      payload: Array(10).fill({ id: 1, title: 'Product' }) 
    };
    const expectedState = { ...initialState, isLoading: false, products: action.payload };
    expect(productReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchProducts.rejected', () => {
    const action = { 
      type: fetchProducts.rejected.type, 
      error: { message: 'Network error' } 
    };
    const expectedState = { ...initialState, isLoading: false, error: 'Network error' };
    expect(productReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchProducts.rejected with default error', () => {
    const action = { type: fetchProducts.rejected.type, error: {} };
    const expectedState = { ...initialState, isLoading: false, error: 'Failed to fetch products' };
    expect(productReducer(initialState, action)).toEqual(expectedState);
  });

  const testFetchProductsFulfilled = async (env: string, mockData: any) => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = env;

    mockFetch(`${process.env.API_URL}/products`, mockData);
    await dispatch(fetchProducts());

    const expectedProducts = env === 'production' ? mockData.products.slice(0, 10) : mockData;
    expect(store.getState().products).toEqual({ ...initialState, products: expectedProducts, isLoading: false });

    process.env.NODE_ENV = originalEnv;
  };

  it('should handle fetchProducts.fulfilled in production environment', async () => {
    await testFetchProductsFulfilled('production', { products: mockProducts.prod });
  });

  it('should handle fetchProducts.fulfilled in non-production environment', async () => {
    await testFetchProductsFulfilled('development', mockProducts.nonProd);
  });

  it('should handle fetchProducts.rejected with status 500', async () => {
    mockFetch(`${process.env.API_URL}/products`, {}, 500);
    await dispatch(fetchProducts());

    const state = store.getState().products;
    expect(state.isLoading).toBe(false);
    expect(productReducer(state, { type: fetchProducts.rejected.type, error: { message: 'Request failed with status code 500' } }))
      .toEqual({ ...initialState, error: 'Request failed with status code 500' });
  });

  it('should limit products to 10 items in production', async () => {
    const manyProducts = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, title: `Product ${i + 1}` }));
    await testFetchProductsFulfilled('production', { products: manyProducts });
    expect(store.getState().products.products.length).toBe(10);
  });
});