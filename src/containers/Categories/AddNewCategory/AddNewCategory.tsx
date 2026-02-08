import { postFinanceCategory } from '../../../redux/features/categories/categories.api';
import type { ICategoriesMutation } from '../../../types/finance/categories/categories-mutation';
import CategoryForm from '../../../components/forms/finance/CategoryForm/CategoryForm';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/hooks/reduxHooks';
import { selectLoading } from '../../../redux/features/categories/categories.selectors';
import type { FC } from 'react';

interface IAddNewCategory {
  toggleModal: () => void;
}

const AddNewCategory: FC<IAddNewCategory> = ({ toggleModal }) => {
  const dispatch = useAppDispatch();
  const { sendLoading } = useAppSelector(selectLoading);

  const onSubmitCategory = async (category: ICategoriesMutation) => {
    await dispatch(postFinanceCategory(category));
    if (toggleModal) {
      toggleModal();
    }
  };

  return (
    <CategoryForm onSubmitCategory={onSubmitCategory} isLoading={sendLoading} />
  );
};

export default AddNewCategory;
