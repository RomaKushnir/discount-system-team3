import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './AddCategory.module.scss';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import CreatableSelectField from '../../../../components/CreatableSelectField';
import * as actions from '../../../../store/actions';
import {
  selectValidation,
  idValidation,
  titleValidation
} from '../../../../utilities/validation';

const inputStyles = {
  width: '100%',
  marginBottom: '10px'
};

const validate = {
  id: idValidation,
  title: titleValidation,
  tags: selectValidation
};

function AddCategoryModal({ selectedCategory }) {
  const dispatch = useDispatch();

  const [category, setCategory] = useState(selectedCategory);
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({
    id: '',
    title: '',
    tags: ''
  });
  const [touched, setTouched] = useState({ id: true, imageUrl: true, tags: true });
  const [isDisabled, setIsDisabled] = useState(false);
  const [newTags, setNewTags] = useState([]);
  const [deletedTags, setDeletedTags] = useState([]);

  const addCategoryStatus = useSelector((state) => state.categoryReducer.addCategoryStatus);
  const tagsOptions = category.tags?.map((el) => ({ ...el, value: el.id, label: el.name }));

  const onValueChange = (e) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: ''
    }); // remove whatever error was there previously

    setIsDisabled(false);

    setCategory({
      ...category,
      [name]: value
    });

    setTouched({
      ...touched,
      [name]: true
    });
  };

  const onBlur = (e) => {
    const { name, value } = e.target;

    const error = validate[name](value);

    setErrors({
      ...errors,
      ...error && { [name]: touched[name] && error }
    });

    setIsDisabled(false);
  };

  const onSaveButtonClick = (e) => {
    e.preventDefault();

    const formValidation = Object.keys(category).reduce(
      (acc, key) => {
        const newError = validate[key](category[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...newError && { [key]: newError }
          },
          touched: {
            ...acc.touched,
            ...newTouched
          }
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched }
      }
    );

    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    const existingErrors = Object.values(formValidation.errors).filter((error) => error !== '');
    const emptyFields = Object.values(formValidation.touched).filter((field) => field === '');

    if (
      existingErrors.length === 0 // no errors
      && emptyFields.length === 0 // no empty fields
      && Object.values(formValidation.touched).every((t) => t === true) // every touched field is true
    ) {
      setIsDisabled(false);
      if (category.title !== selectedCategory.title) {
        dispatch(actions.categoryActions.addCategory({ ...category, tags: newTags }));
      } else if (tags.length > 0) {
        dispatch(actions.categoryActions.addTagsToCategory({ id: category.id, tags: newTags }));
      } else {
        setIsDisabled(true);
      }
      if (deletedTags.length > 0) {
        dispatch(actions.categoryActions.deleteTagsFromCategory({ id: category.id, tags: deletedTags }));
      }
    }
  };

  const handleTagsChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'create-option') {
      const newValuesOnly = newValue.filter((el) => !el.id).map((el) => ({ name: el.label }));
      setNewTags([...newValuesOnly]);
      setTags([...newValue]);
    }
    if (actionMeta.action === 'remove-value') {
      setDeletedTags([...deletedTags, actionMeta.removedValue.id]);
    }
  };

  return (
    <div className = {styles.container}>
      {addCategoryStatus.loading === true
      && <div className = {styles.loadingContainer}>
        <CircularProgress />
      </div>}
      <form>
      <div className = {styles.inputs}>
        <TextInput
          onValueChange = {onValueChange}
          placeholder = "Category"
          label = "Category"
          style = {inputStyles}
          name = "title"
          type = "text"
          value = {category.title}
          onBlur={onBlur}
          required
          touched = {touched.title}
          error = {errors.title}
          className = {styles.title}
        />
        <CreatableSelectField
          isMulti
          label = "Tags"
          options = {tagsOptions || null}
          onChange = {handleTagsChange}
          error = {errors.tags}
          className = {styles.creatableSelect}
          initialValue = {tagsOptions}
        />
      </div>
      {addCategoryStatus.loading === false && addCategoryStatus.error
      && <div className = {styles.errorMessage}>
        {addCategoryStatus.error.message}
      </div>
      }
      <div className = {styles.buttonContainer}>
        <Button
          btnText = "Save"
          onClick = {onSaveButtonClick}
          isDisabled = {isDisabled}
          type = "submit"
        />
      </div>
      </form>
    </div>
  );
}

export default AddCategoryModal;
