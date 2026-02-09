import Button from '../../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Categories.css';
import { useEffect, useState } from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Modal from '../../UI/Modal/Modal';
import AddNewCategory from './AddNewCategory/AddNewCategory';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import {
  selectFinanceCategories,
  selectLoading,
} from '../../redux/features/categories/categories.selectors';
import { getFinanceCategories } from '../../redux/features/categories/categories.api';
import CategoriesCard from './CategoriesCard/CategoriesCard';
import Loader from '../../UI/Loader/Loader';
import {
  selectError,
  selectTransactions,
} from '../../redux/features/transactions/transactions.selectors';
import { getTransactions } from '../../redux/features/transactions/transactions.api';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectFinanceCategories);
  const transactions = useAppSelector(selectTransactions);
  const { fetchAllLoading } = useAppSelector(selectLoading);
  const isError = useAppSelector(selectError);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const toggleModal = () => setIsOpenModal((prev) => !prev);

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getFinanceCategories());
  }, [dispatch]);

  const renderContent = () => {
    if (fetchAllLoading) {
      return (
        <div className="fixed-position-center">
          <Loader />
        </div>
      );
    }

    if (!fetchAllLoading && categories.length === 0) {
      <p className="not-found-message fixed-position-center">
        Add categories to see them here
      </p>;
    }

    if (isError) {
      <p className="error fixed-position-center">Unknown Error</p>;
    }

    return (
      <>
        {categories.map((category) => (
          <CategoriesCard
            key={category.id}
            category={category}
            transactions={transactions}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <section className="categories">
        <div className="categories-actions">
          <Button className="categories-action-add" onClick={toggleModal}>
            <FontAwesomeIcon icon={faPlus} />
            <p className="categories-action-add-text">add category</p>
          </Button>
        </div>

        <div className="categories-content">
          <p className="categories-title">Category</p>
          <div className="categories-block">{renderContent()}</div>
        </div>
      </section>
      {isOpenModal && (
        <>
          <Backdrop onClose={toggleModal} />
          <Modal onClose={toggleModal}>
            <AddNewCategory toggleModal={toggleModal} />
          </Modal>
        </>
      )}
    </>
  );
};

export default Categories;
