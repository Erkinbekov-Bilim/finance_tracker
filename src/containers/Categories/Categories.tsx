import Button from '../../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Categories.css';
import { useEffect, useState, type ReactElement } from 'react';
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

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectFinanceCategories);
  const { sendLoading } = useAppSelector(selectLoading);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const toggleModal = () => setIsOpenModal((prev) => !prev);

  useEffect(() => {
    dispatch(getFinanceCategories());
  }, [dispatch]);

  let render: ReactElement = (
    <div className='fixed-position-center'>
      <Loader />
    </div>
  );

  if (!sendLoading && categories.length > 0) {
    render = (
      <>
        {categories.map((category) => (
          <CategoriesCard key={category.id} category={category} />
        ))}
      </>
    );
  } else if (categories.length == 0 && !selectLoading) {
    render = (
      <p className="not-found-message fixed-position-center">
        Add categories to see them here
      </p>
    );
  }

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
          <div className="categories-block">{render}</div>
        </div>
      </section>
      {isOpenModal && (
        <>
          <Backdrop onClose={toggleModal} />
          <Modal onClose={toggleModal}>
            <AddNewCategory toggleModal={toggleModal}/>
          </Modal>
        </>
      )}
    </>
  );
};

export default Categories;
