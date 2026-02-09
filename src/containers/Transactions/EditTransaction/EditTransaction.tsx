import { useCallback, useEffect } from 'react';
import {
  selectFinanceCategories,
  selectLoading,
} from '../../../redux/features/categories/categories.selectors';
import { selectTransaction } from '../../../redux/features/transactions/transactions.selectors';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/hooks/reduxHooks';
import './EditTransaction.css';
import { useParams } from 'react-router-dom';
import {
  getTransaction,
  putTransaction,
} from '../../../redux/features/transactions/transactions.api';
import type { ITransactionMutation } from '../../../types/finance/transactions/transactiion-mutation';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Modal from '../../../UI/Modal/Modal';
import TransactionForm from '../../../components/forms/finance/TransactionForm/TransactionForm';
import { getFinanceCategories } from '../../../redux/features/categories/categories.api';
import type { ICategories } from '../../../types/finance/categories/categories';

const EditTransaction = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { sendLoading } = useAppSelector(selectLoading);
  const categories = useAppSelector(selectFinanceCategories);
  const transaction = useAppSelector(selectTransaction);

  const getData = useCallback(async (): Promise<void> => {
    await dispatch(getFinanceCategories());
    if (id) {
      await dispatch(getTransaction({ id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    void getData();
  }, [getData]);

  let category: ICategories | null | undefined = null;
  if (categories && transaction) {
    category = categories.find(
      (categoryObject) => categoryObject.id === transaction.category,
    );
  }

  const onSubmitTransaction = async (transactionForm: ITransactionMutation) => {
    if (id && transaction) {
      dispatch(
        putTransaction({
          id,
          transaction: transactionForm,
          createdAt: transaction.createdAt,
        }),
      );
    }
  };

  return (
    <>
      <Backdrop to="/" />
      <Modal to="/">
        {transaction && category && (
          <TransactionForm
            onSubmitTransaction={onSubmitTransaction}
            isLoading={sendLoading}
            defaultValueTransaction={{
              financeType: category.financeType,
              category: category.id,
              amount: transaction.amount,
            }}
            isEdit={true}
          />
        )}
      </Modal>
    </>
  );
};

export default EditTransaction;
