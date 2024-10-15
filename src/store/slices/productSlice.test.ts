// productSlice.test.ts
import productReducer, { fetchProducts } from './productSlice';

describe('productSlice', () => {
  const initialState = {
    products: [],
    isLoading: false,
    error: null,
  };

  it('should return the initial state when called with an unknown action', () => {
    expect(productReducer(initialState, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type };
    const expectedState = { ...initialState, isLoading: true };
    expect(productReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchProducts.fulfilled', () => {
    const action = {
      type: fetchProducts.fulfilled.type,
      payload: [
        { id: 1, title: 'Product 1', category: 'Category 1', image: 'image1.png', images: [] },
        { id: 2, title: 'Product 2', category: 'Category 2', image: 'image2.png', images: [] },
      ],
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
      products: action.payload.slice(0, 10),
    };
    expect(productReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchProducts.rejected', () => {
    const action = {
      type: fetchProducts.rejected.type,
      error: { message: 'Failed to fetch products' },
    };
    const expectedState = { ...initialState, isLoading: false, error: 'Failed to fetch products' };
    expect(productReducer(initialState, action)).toEqual(expectedState);
  });
});