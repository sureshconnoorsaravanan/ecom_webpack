import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../../types/productTypes';
import i18n from 'i18next';

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  language: string;
}

// Define the initial state
const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
  language: 'en', // Default language
};

// Create an async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${process.env.API_URL}/products`);
  return process.env.NODE_ENV === 'production' ? response.data.products : response.data;
});

// Create a slice for the products
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload; // Update language in state
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.products = action.payload.slice(0, 10); // Limit to 10 products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        const errorMessage = action.error.message || 'Failed to fetch products';
        const localizedErrorMessage = i18n.t('error', { error: errorMessage });
        state.error = localizedErrorMessage;
      });
  },
});

// Export the reducer and actions
export const { setLanguage } = productSlice.actions;
export default productSlice.reducer;
