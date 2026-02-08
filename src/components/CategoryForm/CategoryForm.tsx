import { useEffect, type FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { selectFinanceTypes } from '../../redux/features/categories/categories.selectors';
import {
  getFinanceType,
} from '../../redux/features/categories/categories.api';
import type { ICategoriesMutation } from '../../types/finance/categories/categories-mutation';
import { useForm } from 'react-hook-form';
import './CategoryForm.css';
import Loader from '../../UI/Loader/Loader';
import Button from '../../UI/Button/Button';

interface ICategoryFormProps {
  onSubmitCategory: (category: ICategoriesMutation) => void;
  defaultValueCategory?: ICategoriesMutation;
  isEdit?: boolean;
  isLoading?: boolean;
}

const CategoryForm: FC<ICategoryFormProps> = ({
  onSubmitCategory,
  defaultValueCategory,
  isEdit,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const financeTypes = useAppSelector(selectFinanceTypes);

  useEffect(() => {
    dispatch(getFinanceType());
  }, [dispatch]);

  const defaultValues: ICategoriesMutation = defaultValueCategory
    ? defaultValueCategory
    : {
        name: '',
        financeType: '',
      };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = (data: ICategoriesMutation) => {
    onSubmitCategory(data);
    reset();
  };

  useEffect(() => {
    if (defaultValueCategory) {
      reset(defaultValueCategory);
    }
  }, [defaultValueCategory, reset]);

  return (
    <>
      <div className="form-block">
        <p className="form-block-title">
          {isEdit ? 'update category' : 'add category'}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-block-content">
            <div className="form-input-block">
              <label htmlFor="finance-type">Type</label>
              <select
                {...register('financeType', {
                  required: 'Finance type is required',
                  disabled: isLoading,
                })}
                name="financeType"
                id="finance-type"
                title="finance type"
                className="form-select"
              >
                <option disabled className="form-select-option" value="">
                  Select meal time
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                title="Name"
                id="name"
                placeholder="Name"
                className="form-input"
                {...register('name', {
                  required: 'Name is required',
                  disabled: isLoading,
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Name must be at most 20 characters',
                  },
                  validate: (value) =>
                    value.trim() !== '' || 'Name is required',
                })}
              />
              {errors.name && (
                <p className="input-error-message">{errors.name.message}</p>
              )}
            </div>

            <Button
              className="form-submit-btn"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loader-button">
                  <Loader />
                </div>
              ) : (
                'save'
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoryForm;
