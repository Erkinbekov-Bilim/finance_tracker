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
  loading: {
    fetchLoading: boolean;
    fetchAllLoading: boolean;
    sendLoading: boolean;
    deleteLoading: boolean;
  };
}

const initialState: ICategoriesState = {
  financeType: [],
  categories: [],
  category: null,
  isError: false,
  loading: {
    fetchLoading: false,
    fetchAllLoading: false,
    sendLoading: false,
    deleteLoading: false,
  },
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFinanceCategories.pending, (state) => {
      state.loading.fetchAllLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getFinanceCategories.fulfilled,
      (state, { payload: categories }) => {
        state.loading.fetchAllLoading = false;
        state.isError = false;
        state.categories = categories;
      },
    );
    builder.addCase(getFinanceCategories.rejected, (state) => {
      state.loading.fetchAllLoading = false;
      state.isError = true;
    });

    builder.addCase(getFinanceType.pending, (state) => {
      state.loading.fetchLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getFinanceType.fulfilled,
      (state, { payload: financeTypes }) => {
        state.loading.fetchLoading = false;
        state.financeType = financeTypes;
        state.isError = false;
      },
    );
    builder.addCase(getFinanceType.rejected, (state) => {
      state.loading.fetchLoading = false;
      state.isError = true;
    });

    builder.addCase(postFinanceCategory.pending, (state) => {
      state.loading.sendLoading = true;
      state.isError = false;
    });
    builder.addCase(postFinanceCategory.fulfilled, (state) => {
      state.loading.sendLoading = false;
      state.isError = false;
    });
    builder.addCase(postFinanceCategory.rejected, (state) => {
      state.loading.sendLoading = false;
      state.isError = true;
    });

    builder.addCase(deleteFinanceCategory.pending, (state) => {
      state.loading.deleteLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteFinanceCategory.fulfilled, (state) => {
      state.loading.deleteLoading = false;
      state.isError = false;
    });
    builder.addCase(deleteFinanceCategory.rejected, (state) => {
      state.loading.deleteLoading = false;
      state.isError = true;
    });

    builder.addCase(getFinanceCategory.pending, (state) => {
      state.loading.fetchLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getFinanceCategory.fulfilled,
      (state, { payload: category }) => {
        state.loading.fetchLoading = false;
        state.isError = false;
        state.category = category;
      },
    );
    builder.addCase(getFinanceCategory.rejected, (state) => {
      state.loading.fetchLoading = false;
      state.isError = true;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
