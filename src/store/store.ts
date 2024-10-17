import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/products/productSlice';
import themeReducer from './slices/theme/themeSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
