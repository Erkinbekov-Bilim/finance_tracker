import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../api/axiosApi';
import type { ITransactionCategory } from '../../../types/finance/transactions/transaction-category';
import type { ICategoriesApi } from '../../../types/finance/categories/categories-api';
import type { ITransactionMutation } from '../../../types/finance/transactions/transactiion-mutation';
import type { ITransactionData } from '../../../types/finance/transactions/transaction-data';
import type { ITransaction } from '../../../types/finance/transactions/transaction';
import type { ITransactionApi } from '../../../types/finance/transactions/transaction-api';

export const getTransactionCategory = createAsyncThunk<
  ITransactionCategory[],
  { financeType: string }
>('finance/getCategory', async (state) => {
  const response = await axiosApi.get<ICategoriesApi>(
    `/categories.json?orderBy="financeType"&equalTo="${state.financeType}"`,
  );
  const data = response.data;

  if (data) {
    const categoriesIDS: string[] = Object.keys(data);

    const categories: ITransactionCategory[] = categoriesIDS.map((id) => {
      return {
        name: data[id].name,
        id,
      };
    });
    return categories;
  }

  return [];
});

export const getTransactions = createAsyncThunk<ITransaction[]>(
  'finance/getTransactions',
  async () => {
    const response = await axiosApi.get<ITransactionApi>('/transactions.json');
    const data = response.data;

    if (data) {
      const transactionsIDS: string[] = Object.keys(data);
      const transaction: ITransaction[] = transactionsIDS.map((id) => {
        return {
          ...data[id],
          id,
        };
      });

      return transaction;
    }

    return [];
  },
);

export const postTransaction = createAsyncThunk<void, ITransactionMutation>(
  'finance/postTransaction',
  async (transaction) => {
    await axiosApi.post<ITransactionData>('/transactions.json', {
      category: transaction.category,
      amount: transaction.amount,
      createdAt: new Date().toISOString(),
    });
  },
);

export const getTransaction = createAsyncThunk<
  ITransactionData,
  { id: string }
>('finance/getTransaction', async (state) => {
  const response = await axiosApi.get<ITransactionData>(
    `/transaction/${state.id}.json`,
  );
  const data = response.data;

  return data;
});
