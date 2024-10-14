import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the type for a single product item
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Define the state interface
interface ProductState {
  listItems: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  listItems: [],
  status: 'idle',
  error: null,
};

// Define the async thunk with proper typing
export const getList = createAsyncThunk<Product[]>(
  'getProductList',
  async () => {
    const response = await axios.get<Product[]>(process.env.API_URL+'/products');
    return response.data; // This will be typed as an array of Product
  }
);

// Create the slice
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getList.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.listItems = action.payload; // Store the products in state
      })
      .addCase(getList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default productSlice.reducer;
