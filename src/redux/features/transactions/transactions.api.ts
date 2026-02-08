import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ITransactionMutation } from '../../../types/finance/transactions/transactiion-mutation';
import axiosApi from '../../../api/axiosApi';
import type { ITransactionCategory } from '../../../types/finance/transactions/transaction-category';
import type { ICategoriesApi } from '../../../types/finance/categories/categories-api';

export const postTransaction = createAsyncThunk<void, ITransactionMutation>(
  'finance/postTransaction',
  async (transaction) => {
    await axiosApi.post('/transactions.json', transaction);
  },
);

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
    console.log(categories);

    return categories;
  }

  return [];
});
