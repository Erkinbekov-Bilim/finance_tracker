import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../features/categories/categories.slice';

export const store = configureStore({
  reducer: {
    categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
