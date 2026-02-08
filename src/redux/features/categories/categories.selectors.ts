import type { RootState } from '../../app/store';

export const selectErrorState = (state: RootState) =>
  state.categoriesReducer.isError;

export const selectFinanceTypes = (state: RootState) =>
  state.categoriesReducer.financeType;

export const selectFinanceCategories = (state: RootState) =>
  state.categoriesReducer.categories;

export const selectFinanceCategory = (state: RootState) =>
  state.categoriesReducer.category;
