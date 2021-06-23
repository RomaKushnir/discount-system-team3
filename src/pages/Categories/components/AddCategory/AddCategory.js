import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './AddCategory.module.scss';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import CreatableSelectField from '../../../../components/CreatableSelectField';
import * as actions from '../../../../store/actions';
import {
  selectValidation, imageUrlValidation, idValidation, titleValidation
} from '../../../../utilities/validation';

const inputStyles = {
  width: '300px',
  marginBottom: '10px'
};

const validate = {
  id: idValidation,
  imageUrl: imageUrlValidation,
  title: titleValidation,
  tags: selectValidation
};

function AddCategoryModal({ onSave, selectedCategory }) {
  const dispatch = useDispatch();

  const [category, setCategory] = useState(selectedCategory);
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({
    id: '',
    imageUrl: '',
    title: '',
    tags: ''
  });
  const [touched, setTouched] = useState({ id: true, imageUrl: true });
  const [isDisabled, setIsDisabled] = useState(false);

  const addCategoryStatus = useSelector((state) => state.categoryReducer.addCategoryStatus);

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
      console.log(category);
      dispatch(actions.categoryActions.addCategory(category)); // dispatch category and array with new tags
    } else {
      setIsDisabled(true);
    }
  };

  const onOkClick = () => {
    onSave();
    dispatch(actions.categoryActions.clearAddCategoryStatus());
    // dispatch(actions.categoryActions.getCategories()); // uncomment when we have redux flow for this
  };

  const handleTagsChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(actionMeta);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();

    console.log(tags);
    const newValuesOnly = new Set(newValue.filter((el) => !el.id).map((el) => el.value));
    setTags([...newValuesOnly]);
  };

  console.log(tags);

  return (
    <div className = {styles.container}>
      {addCategoryStatus.loading === false && addCategoryStatus.success
      && <div className = {styles.successMessageContainer}>
        <div className = {styles.successMessage}>{addCategoryStatus.success}</div>
        <Button
          btnText = "OK"
          onClick = {onOkClick}
          type = "submit"
        />
      </div>}
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
          options = {tags}
          onChange = {handleTagsChange}
          error = {errors.tags}
          className = {styles.creatableSelect}
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
