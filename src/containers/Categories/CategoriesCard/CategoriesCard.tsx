import { useState, type FC } from 'react';
import type { ICategories } from '../../../types/finance/categories/categories';
import './CategoriesCard.css';
import Button from '../../../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../../redux/hooks/reduxHooks';
import {
  deleteFinanceCategory,
  getFinanceCategories,
} from '../../../redux/features/categories/categories.api';
import EditCategory from '../EditCategory/EditCategory';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Modal from '../../../UI/Modal/Modal';
import type { ITransaction } from '../../../types/finance/transactions/transaction';

interface ICategoriesCardProps {
  category: ICategories;
  transactions: ITransaction[];
}

const CategoriesCard: FC<ICategoriesCardProps> = ({
  category,
  transactions,
}) => {
  const dispatch = useAppDispatch();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const toggleModal = () => setIsOpenModal(!isOpenModal);

  const transactionIDS: (string | null)[] = transactions.map((transaction) => {
    if (transaction.category === category.id) {
      return transaction.id;
    }

    return null;
  });

  const deleteCategory = async (idCategory: string) => {
    const isConfirmed = confirm(
      'Are you sure you want to delete this category?',
    );

    if (isConfirmed) {
      if (idCategory) {
        await dispatch(
          deleteFinanceCategory({ idCategory, transactionIDS }),
        ).unwrap();
      }
      await dispatch(getFinanceCategories());
    }
  };

  return (
    <>
      {isOpenModal && (
        <>
          <Backdrop onClose={toggleModal} />
          <Modal onClose={toggleModal}>
            <EditCategory id={category.id} toggleModal={toggleModal} />
          </Modal>
        </>
      )}
      <div className="category-card">
        <p className="category-name">{category.name}</p>
        <div className="category-content">
          <p className={`category-type category-type-${category.financeType}`}>
            {category.financeType}
          </p>
          <div className="category-actions">
            <Button
              className="category-action category-action-delete"
              onClick={() => deleteCategory(category.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button
              className="category-action category-action-edit"
              onClick={toggleModal}
            >
              <FontAwesomeIcon icon={faPen} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesCard;
