import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../features/categories/categories.slice';
import { transactionReducer } from '../features/transactions/transactions.slice';

export const store = configureStore({
  reducer: {
    categoriesReducer,
    transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
