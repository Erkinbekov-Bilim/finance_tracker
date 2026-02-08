import { useEffect, type FC } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/hooks/reduxHooks';
import CategoryForm from '../../../components/forms/finance/CategoryForm/CategoryForm';
import {
  getFinanceCategory,
  putFinanceCategory,
} from '../../../redux/features/categories/categories.api';
import {
  selectFinanceCategory,
  selectLoading,
} from '../../../redux/features/categories/categories.selectors';
import type { ICategoriesMutation } from '../../../types/finance/categories/categories-mutation';

interface IEditCategoryProps {
  id: string;
  toggleModal?: () => void;
}

const EditCategory: FC<IEditCategoryProps> = ({ id, toggleModal }) => {
  const dispatch = useAppDispatch();
  const { sendLoading } = useAppSelector(selectLoading);
  const category = useAppSelector(selectFinanceCategory);

  useEffect(() => {
    dispatch(getFinanceCategory({ id }));
  }, [dispatch, id]);

  const onSubmitCategory = async (category: ICategoriesMutation) => {
    await dispatch(putFinanceCategory({ id, category }));
    if (toggleModal) {
      toggleModal();
    }
  };

  return (
    <>
      {category && (
        <CategoryForm
          defaultValueCategory={category}
          onSubmitCategory={onSubmitCategory}
          isEdit={true}
          isLoading={sendLoading}
        />
      )}
    </>
  );
};

export default EditCategory;
