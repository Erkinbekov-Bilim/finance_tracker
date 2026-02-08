import type { RootState } from '../../app/store';

export const selectLoading = (state: RootState) =>
  state.categoriesReducer.loading;

export const selectError = (state: RootState) =>
  state.categoriesReducer.isError;

export const selectTransactionCategory = (state: RootState) =>
  state.transactionReducer.transactionCategory;
