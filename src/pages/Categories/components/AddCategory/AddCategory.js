import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './AddCategory.module.scss';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import CreatableSelectField from '../../../../components/CreatableSelectField';
import * as actions from '../../../../store/actions';
// import {
//   selectValidation, imageUrlValidation, idValidation, titleValidation
// } from '../../../../utilities/validation';
import {
  selectValidation,
  idValidation,
  titleValidation
} from '../../../../utilities/validation';

const inputStyles = {
  width: '300px',
  marginBottom: '10px'
};

const validate = {
  id: idValidation,
  title: titleValidation,
  tags: selectValidation
};

function AddCategoryModal({ onSave, selectedCategory }) {
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
  const [deletedTags, setDeletedTags] = useState([]);

  const addCategoryStatus = useSelector((state) => state.categoryReducer.addCategoryStatus);
  const addTagsStatus = useSelector((state) => state.categoryReducer.addTagsToCategoryStatus);
  const tagsOptions = category.tags?.map((el) => ({ value: el.id, label: el.name }));

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
      if (category.title !== selectedCategory.title) {
        dispatch(actions.categoryActions.addCategory({ ...category, tags }));
      } else if (tags.length > 0) {
        dispatch(actions.categoryActions.addTagsToCategory({ ...category, tags }));
      } else if (deletedTags.length > 0) {
        dispatch(actions.categoryActions.deleteTagsFromCategory({ ...category, deletedTags }));
      } else {
        setIsDisabled(true);
      }
    }
  };

  const onOkClick = () => {
    onSave();
    dispatch(actions.categoryActions.clearAddCategoryStatus());
    dispatch(actions.categoryActions.getCategories());
  };

  const handleTagsChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(actionMeta);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();

    if (actionMeta.action === 'create-option') {
      // const newValuesOnly = new Set(newValue.filter((el) => !el.id).map((el) => ({ name: el.label })));

      const newValuesOnly = new Map(newValue.filter((el) => !el.id).map((el) => ({ name: el.label })));
      console.log(newValuesOnly);
      setTags([...newValuesOnly]);
      // const tagsObjects = [...newValue].map((el) => ({ name: el.label }));
      // console.log(tagsObjects);
      // setTags(tagsObjects);
    }
    if (actionMeta.action === 'remove-value') {
      const tagsIds = [...newValue].map((el) => el.id);
      console.log(tagsIds);
      setDeletedTags(tagsIds);
    }
  };

  console.log(tags);

  return (
    <div className = {styles.container}>
      {addTagsStatus.loading === false && addTagsStatus.success
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
