import { useEffect } from 'react';
import {
  selectFinanceCategories,
  selectLoading,
} from '../../redux/features/categories/categories.selectors';
import {
  selectError,
  selectTransactions,
} from '../../redux/features/transactions/transactions.selectors';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getTransactions } from '../../redux/features/transactions/transactions.api';
import Loader from '../../UI/Loader/Loader';
import TransactionCard from './TransactionCard/TransactionCard';
import { getFinanceCategories } from '../../redux/features/categories/categories.api';
import './Transactions.css';
import type { ITransaction } from '../../types/finance/transactions/transaction';
import { Outlet } from 'react-router-dom';

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const categories = useAppSelector(selectFinanceCategories);
  const { fetchAllLoading } = useAppSelector(selectLoading);
  const isError = useAppSelector(selectError);

  useEffect(() => {
    dispatch(getFinanceCategories());
    dispatch(getTransactions());
  }, [dispatch]);

  const renderContent = () => {
    if (fetchAllLoading) {
      return (
        <div className="fixed-position-center">
          <Loader />
        </div>
      );
    }

    if (!fetchAllLoading && transactions.length === 0) {
      return (
        <p className="not-found-message fixed-position-center">
          Add transaction to see them here
        </p>
      );
    }

    if (isError) {
      return <p className="error fixed-position-center">Unknown Error</p>;
    }

    return (
      <>
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            categories={categories}
          />
        ))}
      </>
    );
  };

  const total: number = transactions.reduce(
    (acc, transaction: ITransaction) => {
      acc += transaction.amount;

      return acc;
    },
    0,
  );

  return (
    <>
      <Outlet />
      <section className="transactions">
        <div className="transactions-content">
          <p className="transactions-title">Transactions</p>
          <div className="transaction-total">
            <p className="transaction-total-label">
              Total: <span className="transaction-total-text">{total}</span>
            </p>
          </div>
          <div className="transactions-block">{renderContent()}</div>
        </div>
      </section>
    </>
  );
};

export default Transactions;
