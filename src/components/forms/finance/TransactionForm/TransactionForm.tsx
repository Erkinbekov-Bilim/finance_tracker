import { useEffect, useState, type FC } from 'react';
import type { ITransactionMutation } from '../../../../types/finance/transactions/transactiion-mutation';
import '../FinanceForm.css';
import { useForm } from 'react-hook-form';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../redux/hooks/reduxHooks';
import { selectFinanceTypes } from '../../../../redux/features/categories/categories.selectors';
import { getFinanceType } from '../../../../redux/features/categories/categories.api';
import { getTransactionCategory } from '../../../../redux/features/transactions/transactions.api';
import { selectTransactionCategory } from '../../../../redux/features/transactions/transactions.selectors';

interface ITransactionFormProps {
  onSubmitTransaction?: (transaction: ITransactionMutation) => void;
  defaultValueTransaction?: ITransactionMutation;
  isEdit?: boolean;
  isLoading?: boolean;
}

const TransactionForm: FC<ITransactionFormProps> = ({
  onSubmitTransaction,
  defaultValueTransaction,
  isEdit,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const financeTypes = useAppSelector(selectFinanceTypes);
  const transactionCategory = useAppSelector(selectTransactionCategory);

  useEffect(() => {
    dispatch(getFinanceType());
  }, [dispatch]);

  const defaultValues: ITransactionMutation = {
    financeType: '',
    category: '',
    amount: null,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data: ITransactionMutation) => {
    // onSubmitTransaction(data);
  };

  useEffect(() => {
    if (defaultValueTransaction) {
      reset(defaultValueTransaction);
    }
  }, [defaultValueTransaction, reset]);

  return (
    <>
      <div className="form-block">
        <p className="form-block-title">
          {isEdit ? 'update transaction' : 'create transaction'}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-block-content">
            <div className="form-input-block">
              <label htmlFor="finance-type">Type</label>
              <select
                {...register('financeType', {
                  onChange(event) {
                    dispatch(
                      getTransactionCategory({
                        financeType: event.target.value,
                      }),
                    );
                  },
                  required: 'Finance type is required',
                  disabled: isLoading,
                })}
                name="financeType"
                id="finance-type"
                title="finance type"
                className="form-select"
              >
                <option disabled className="form-select-option" value="">
                  Select finance type
                </option>
                {financeTypes.map((type) => (
                  <option
                    value={type.id}
                    className="form-select-option"
                    key={type.id}
                  >
                    {type.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-input-block">
              <label htmlFor="category">Type</label>
              <select
                {...register('category', {
                  required: 'category is required',
                  disabled: isLoading,
                })}
                name="category"
                id="category"
                title="category"
                className="form-select"
              >
                <option disabled className="form-select-option" value="">
                  Select category
                </option>
                {transactionCategory.map((category) => (
                  <option
                    value={category.id}
                    className="form-select-option"
                    key={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TransactionForm;
