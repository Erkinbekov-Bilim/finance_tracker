import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/hooks/reduxHooks';
import { selectLoading } from '../../../redux/features/transactions/transactions.selectors';
import type { ITransactionMutation } from '../../../types/finance/transactions/transactiion-mutation';
import { postTransaction } from '../../../redux/features/transactions/transactions.api';
import TransactionForm from '../../../components/forms/finance/TransactionForm/TransactionForm';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Modal from '../../../UI/Modal/Modal';

const AddNewTransaction = () => {
  const dispatch = useAppDispatch();
  const { sendLoading } = useAppSelector(selectLoading);

  const onSubmitTransaction = async (transaction: ITransactionMutation) => {
    await dispatch(postTransaction(transaction));
  };

  return (
    <>
      <Backdrop to="/" />
      <Modal to="/">
        <TransactionForm
          onSubmitTransaction={onSubmitTransaction}
          isLoading={sendLoading}
        />
      </Modal>
    </>
  );
};

export default AddNewTransaction;
