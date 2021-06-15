import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

  const locationsList = useSelector((state) => state.locationReducer.locationsList);
  const initialLocation = locationsList.find((el) => el.id === selectedVendor.locationId);
  const transformedInitialLocation = {
    id: initialLocation?.id,
    value: initialLocation?.city,
    label: initialLocation?.city
  };

  console.log(transformedInitialLocation);

  const locationsObject = locationsList.reduce((acc, location) => {
    acc[location.country] = [...acc[location.country] || [], {
      id: location.id,
      value: location.city,
      label: location.city
    }];

    return acc;
  }, {});

  const locationOptions = Object.keys(locationsObject).reduce((acc, key) => {
    const obj = { label: key, options: locationsObject[key] };
    acc.push(obj);
    return acc;
  }, []);

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
      onSave();
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <form className = {styles.container}>
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
          options = {locationOptions}
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
      <div className = {styles.buttonContainer}>
        <Button
          btnText = "Save"
          onClick = {onSaveButtonClick}
          isDisabled = {isDisabled}
        />
      </div>
    </form>
  );
}

export default AddVendorModal;
