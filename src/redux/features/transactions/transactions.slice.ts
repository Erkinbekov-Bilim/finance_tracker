import { createSlice } from '@reduxjs/toolkit';
import type { ITransaction } from '../../../types/finance/transactions/transaction';
import {
  getTransactionCategory,
  getTransactions,
  postTransaction,
} from './transactions.api';
import type { ITransactionCategory } from '../../../types/finance/transactions/transaction-category';

interface ITransactionsState {
  transactions: ITransaction[];
  transactionCategory: ITransactionCategory[];
  isError: boolean;
  loading: {
    fetchLoading: boolean;
    fetchAllLoading: boolean;
    sendLoading: boolean;
    deleteLoading: boolean;
  };
}

const initialState: ITransactionsState = {
  transactions: [],
  transactionCategory: [],
  isError: false,
  loading: {
    fetchLoading: false,
    fetchAllLoading: false,
    sendLoading: false,
    deleteLoading: false,
  },
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postTransaction.pending, (state) => {
      state.loading.sendLoading = true;
    });
    builder.addCase(postTransaction.fulfilled, (state) => {
      state.loading.sendLoading = false;
    });
    builder.addCase(postTransaction.rejected, (state) => {
      state.loading.sendLoading = false;
      state.isError = true;
    });

    builder.addCase(getTransactionCategory.pending, (state) => {
      state.loading.fetchAllLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getTransactionCategory.fulfilled,
      (state, { payload: transactionCategory }) => {
        state.loading.fetchAllLoading = false;
        state.isError = false;
        state.transactionCategory = transactionCategory;
      },
    );
    builder.addCase(getTransactionCategory.rejected, (state) => {
      state.loading.fetchAllLoading = false;
      state.isError = true;
    });

    builder.addCase(getTransactions.pending, (state) => {
      state.loading.fetchAllLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getTransactions.fulfilled,
      (state, { payload: transactions }) => {
        state.loading.fetchAllLoading = false;
        state.isError = false;
        state.transactions = transactions;
      },
    );
    builder.addCase(getTransactions.rejected, (state) => {
      state.loading.fetchAllLoading = false;
      state.isError = true;
    });
  },
});

export const transactionReducer = transactionSlice.reducer;
