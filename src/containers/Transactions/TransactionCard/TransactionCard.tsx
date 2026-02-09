import type { FC } from 'react';
import type { ITransaction } from '../../../types/finance/transactions/transaction';
import './TransactionCard.css';
import dayjs from 'dayjs';
import type { ICategories } from '../../../types/finance/categories/categories';

interface ITransactionCardProps {
  categories: ICategories[];
  transaction: ITransaction;
}

const TransactionCard: FC<ITransactionCardProps> = ({
  transaction,
  categories,
}) => {
  const formatTime: string = dayjs(transaction.createdAt).format(
    'DD.MM.YYYY HH:mm:ss',
  );

  const category: ICategories | undefined = categories.find(
    (categoryObject) => categoryObject.id === transaction.category,
  );

  const getFinanceType = (): string | null => {
    if (category) {
      return category.financeType;
    }

    return null;
  };

  return (
    <div className="transaction">
      <p className={`transaction-amount transaction-${getFinanceType()}`}>
        {transaction.amount}
      </p>
      <p>{formatTime}</p>
      <p>{category && category.name}</p>
      <div className="transaction-actions">
        
      </div>
    </div>
  );
};

export default TransactionCard;
