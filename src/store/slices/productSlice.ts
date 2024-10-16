import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../types/productTypes';

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

// Create an async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(`${process.env.API_URL}/products`);
    return process.env.NODE_ENV === 'production' ? response.data.products : response.data;
  }
);

// Create a slice for the products
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[] | { products: Product[] }>) => {
        state.isLoading = false;
        const products = Array.isArray(action.payload) ? action.payload : action.payload?.products || []; 
        state.products = products.slice(0, 10); // Limit to 10 products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

// Export the reducer
export default productSlice.reducer;