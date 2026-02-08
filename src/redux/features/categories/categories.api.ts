import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../api/axiosApi';
import type { IFinanceType } from '../../../types/finance/finance-type';
import type { ICategoriesMutation } from '../../../types/finance/categories/categories-mutation';
import type { ICategories } from '../../../types/finance/categories/categories';
import type { ICategoriesApi } from '../../../types/finance/categories/categories-api';
import type { AppDispatch } from '../../app/store';

export const getFinanceCategories = createAsyncThunk<ICategories[]>(
  'finance/getFinanceCategories',
  async () => {
    const response = await axiosApi.get<ICategoriesApi>('/categories.json');
    const data = response.data;

    if (data) {
      const categoriesIDS: string[] = Object.keys(data);

      const categories: ICategories[] = categoriesIDS.map((categoryKey) => {
        return {
          ...data[categoryKey],
          id: categoryKey,
        };
      });

      return categories;
    }

    return [];
  },
);

export const getFinanceType = createAsyncThunk<IFinanceType[]>(
  'finance/getFinanceType',
  async () => {
    const response = await axiosApi.get<IFinanceType[]>('/finance_type.json');
    const data = response.data;

    return data;
  },
);

export const postFinanceCategory = createAsyncThunk<
  void,
  ICategoriesMutation,
  { dispatch: AppDispatch }
>('finance/postFinanceCategory', async (category, thunkApi) => {
  await axiosApi.post('/categories.json', category);
  thunkApi.dispatch(getFinanceCategories());
});

export const deleteFinanceCategory = createAsyncThunk<
  void,
  { id: string },
  { dispatch: AppDispatch }
>('finance/deleteFinanceCategory', async (state, thunkApi) => {
  await axiosApi.delete(`/categories/${state.id}.json`);
  thunkApi.dispatch(getFinanceCategories());
});

export const getFinanceCategory = createAsyncThunk<
  ICategoriesMutation,
  { id: string }
>('finance/getFinanceCategory', async (state) => {
  const response = await axiosApi.get(`/categories/${state.id}.json`);
  const data = response.data;

  return data;
});

export const putFinanceCategory = createAsyncThunk<
  void,
  { id: string; category: ICategoriesMutation },
  { dispatch: AppDispatch }
>('finance/putFinanceCategory', async (state, thunkApi) => {
  await axiosApi.put(`/categories/${state.id}.json`, state.category);
  thunkApi.dispatch(getFinanceCategories());
});
