import { useEffect, type FC } from 'react';
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
import { Link } from 'react-router-dom';
import Loader from '../../../../UI/Loader/Loader';
import './TransactionForm.css';

interface ITransactionFormProps {
  onSubmitTransaction: (transaction: ITransactionMutation) => void;
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
    if (data.amount) {
      onSubmitTransaction({
        ...data,
        amount:
          data.financeType === 'income'
            ? Math.abs(data.amount)
            : -Math.abs(data.amount),
      });
    }
    reset();
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

            <div className="form-input-block">
              <label htmlFor="amount">Price</label>
              <div className="form-input-content">
                <input
                  type="number"
                  title="amount"
                  id="amount"
                  placeholder="amount"
                  className="form-input"
                  {...register('amount', {
                    required: 'Amount is required',
                    disabled: isLoading,
                    minLength: {
                      value: 1,
                      message: 'Amount must be more than 0',
                    },
                    maxLength: {
                      value: 1000000,
                      message: 'Amount must be less than 1000000',
                    },
                    validate: {
                      isNumber: (value) =>
                        !isNaN(Number(value)) || 'Amount must be a number',
                      isPositive: (value) =>
                        Number(value) > 0 || 'Amount must be greater than 0',
                    },
                  })}
                />
                <div className="currency-block">
                  <span className="currency">kgs</span>
                </div>
              </div>
              {errors.amount && (
                <p className="input-error-message">{errors.amount.message}</p>
              )}
            </div>
            <Link to={'/'} className="form-submit-btn transaction-button" type="submit">
              {isLoading ? (
                <div className="loader-button">
                  <Loader />
                </div>
              ) : (
                'save'
              )}
            </Link>
            <Link to={'/'} className="form-submit-btn transaction-button" type="reset">
              {isLoading ? (
                <div className="loader-button">
                  <Loader />
                </div>
              ) : (
                'cancel'
              )}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default TransactionForm;
