import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './AddVendor.module.scss';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import SelectField from '../../../../components/SelectField';
import * as actions from '../../../../store/actions';
import {
  idValidation,
  titleValidation,
  emailValidation,
  imageUrlValidation,
  companyDescriptionValidation,
  selectValidation
} from '../../../../utilities/validation';
import { getCitiesGroupedByCountryOptions } from '../../../../store/selectors';

const inputStyles = {
  width: '300px'
};

const validate = {
  id: idValidation,
  title: titleValidation,
  email: emailValidation,
  imageUrl: imageUrlValidation,
  description: companyDescriptionValidation,
  locationId: selectValidation
};

function AddVendorModal({ onSave, selectedVendor }) {
  const dispatch = useDispatch();

  const [vendor, setVendor] = useState(selectedVendor);
  const [errors, setErrors] = useState({
    id: '',
    title: '',
    locationId: '',
    email: '',
    imageUrl: '',
    description: ''
  });
  const [touched, setTouched] = useState({ id: true });
  const [isDisabled, setIsDisabled] = useState(false);

  const citiesOptions = useSelector(getCitiesGroupedByCountryOptions);
  const locationsList = useSelector((state) => state.locationReducer.locationsList);
  const addVendorStatus = useSelector((state) => state.vendorReducer.addVendorStatus);

  const transformedInitialLocation = useMemo(() => {
    const initialLocation = locationsList.find((el) => el.id === selectedVendor.locationId);
    return {
      id: initialLocation?.id,
      value: initialLocation?.city,
      label: initialLocation?.city
    };
  }, [locationsList, selectedVendor]);

  const onValueChange = (e) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: ''
    }); // remove whatever error was there previously

    setIsDisabled(false);

    setVendor({
      ...vendor,
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

  const onChangeLocation = (selectedOption) => {
    setVendor({
      ...vendor,
      locationId: selectedOption?.id
    });

    setErrors({
      ...errors,
      locationId: ''
    });

    setIsDisabled(false);
  };

  const onSaveButtonClick = (e) => {
    e.preventDefault();

    const formValidation = Object.keys(vendor).reduce(
      (acc, key) => {
        const newError = validate[key](vendor[key]);
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
      dispatch(actions.vendorActions.addVendor(vendor));
    } else {
      setIsDisabled(true);
    }
  };

  const onOkClick = () => {
    onSave();
    dispatch(actions.vendorActions.addVendorClearStatus());
  };

  return (
    <div className = {styles.container}>
      {addVendorStatus.loading === false && addVendorStatus.success
      && <div className = {styles.successMessageContainer}>
        <div className = {styles.successMessage}>{addVendorStatus.success}</div>
        <Button
          btnText = "OK"
          onClick = {onOkClick}
          type = "submit"
        />
      </div>}
      {addVendorStatus.loading === true
      && <div className = {styles.loadingContainer}>
        <CircularProgress />
      </div>}
      <form>
      <div className = {styles.inputs}>
        <TextInput
          onValueChange = {onValueChange}
          placeholder = "Company name"
          label = "Company name"
          style = {inputStyles}
          name = "title"
          type = "text"
          value = {vendor.title}
          onBlur={onBlur}
          required
          touched = {touched.title}
          error = {errors.title}
        />
        <TextInput
          onValueChange = {onValueChange}
          placeholder = "Email"
          label = "Email"
          style = {inputStyles}
          name = "email"
          type="email"
          value = {vendor.email}
          onBlur={onBlur}
          required
          touched = {touched.email}
          error = {errors.email}
        />
        <TextInput
          onValueChange = {onValueChange}
          placeholder = "Image Url"
          label = "Image Url"
          style = {inputStyles}
          name = "imageUrl"
          type = "url"
          value = {vendor.imageUrl}
          onBlur={onBlur}
          required
          touched = {touched.imageUrl}
          error = {errors.imageUrl}
        />
        <SelectField
          options = {citiesOptions}
          initialValue = {transformedInitialLocation}
          label = "Location"
          placeholder = "Select location"
          onChange = {onChangeLocation}
          error = {errors.locationId}
        />
      </div>
      <textarea
        onChange = {onValueChange}
        className = {styles.description}
        placeholder = "Description"
        value = {vendor.description}
        name = "description"
        onBlur={onBlur}
        required
        touched = {touched.description ? 1 : 0}
      />
      <div className = {styles.error}>{errors.description}</div>
      {addVendorStatus.loading === false && addVendorStatus.error
      && <div className = {styles.errorMessage}>
        {addVendorStatus.error.message}
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

export default AddVendorModal;
