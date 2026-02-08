import { createSlice } from '@reduxjs/toolkit';
import type { IFinanceType } from '../../../types/finance/finance-type';
import {
  deleteFinanceCategory,
  getFinanceCategories,
  getFinanceCategory,
  getFinanceType,
  postFinanceCategory,
} from './categories.api';
import type { ICategories } from '../../../types/finance/categories/categories';
import type { ICategoriesMutation } from '../../../types/finance/categories/categories-mutation';

interface ICategoriesState {
  financeType: IFinanceType[];
  categories: ICategories[];
  category: ICategoriesMutation | null;
  isError: boolean;
}

const initialState: ICategoriesState = {
  financeType: [],
  categories: [],
  category: null,
  isError: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFinanceCategories.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(
      getFinanceCategories.fulfilled,
      (state, { payload: categories }) => {
        state.isError = false;
        state.categories = categories;
      },
    );
    builder.addCase(getFinanceCategories.rejected, (state) => {
      state.isError = true;
    });

    builder.addCase(getFinanceType.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(
      getFinanceType.fulfilled,
      (state, { payload: financeTypes }) => {
        state.financeType = financeTypes;
        state.isError = false;
      },
    );
    builder.addCase(getFinanceType.rejected, (state) => {
      state.isError = true;
    });

    builder.addCase(postFinanceCategory.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(postFinanceCategory.fulfilled, (state) => {
      state.isError = false;
    });
    builder.addCase(postFinanceCategory.rejected, (state) => {
      state.isError = true;
    });

    builder.addCase(deleteFinanceCategory.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(deleteFinanceCategory.fulfilled, (state) => {
      state.isError = false;
    });
    builder.addCase(deleteFinanceCategory.rejected, (state) => {
      state.isError = true;
    });

    builder.addCase(getFinanceCategory.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(
      getFinanceCategory.fulfilled,
      (state, { payload: category }) => {
        state.isError = false;
        state.category = category;
      },
    );
    builder.addCase(getFinanceCategory.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
