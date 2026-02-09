import type { RootState } from '../../app/store';

export const selectLoading = (state: RootState) =>
  state.transactionReducer.loading;

export const selectError = (state: RootState) =>
  state.transactionReducer.isError;

export const selectTransactionCategory = (state: RootState) =>
  state.transactionReducer.transactionCategory;

export const selectTransactions = (state: RootState) =>
  state.transactionReducer.transactions;

export const selectTransaction = (state: RootState) =>
  state.transactionReducer.transaction;
