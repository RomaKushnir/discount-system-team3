import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './AddVendor.module.scss';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import SelectField from '../../../../components/SelectField';
import * as actions from '../../../../store/actions';
import titleValidation from '../../../../utilities/titleValidation';
import emailValidation from '../../../../utilities/emailValidation';
import imageUrlValidation from '../../../../utilities/imageUrlValidation';
import selectValidation from '../../../../utilities/selectValidation';
import companyDescriptionValidation from '../../../../utilities/compDescriptionValidation';

const inputStyles = {
  width: '300px'
};

const validate = {
  title: titleValidation,
  email: emailValidation,
  imageUrl: imageUrlValidation,
  description: companyDescriptionValidation,
  countryId: selectValidation,
  cityId: selectValidation
};

function AddVendorModal({ onSave, selectedVendor }) {
  const dispatch = useDispatch();

  const [vendor, setVendor] = useState(selectedVendor);
  const [errors, setErrors] = useState({
    title: '',
    countryId: '',
    cityId: '',
    email: '',
    imageUrl: '',
    description: ''
  });
  const [touched, setTouched] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  const countriesList = useSelector((state) => state.locationReducer.countriesList);
  const selectedCitiesList = useSelector((state) => state.locationReducer.selectedCities);
  const country = countriesList.find((el) => el.id === selectedVendor.countryId);
  const city = selectedCitiesList.find((el) => el.id === selectedVendor.cityId);

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

  const onChangeCountry = (selectedOption) => {
    setVendor({
      ...vendor,
      countryId: selectedOption.id
    });
    dispatch(actions.locationActions.getSelectedCitiesList(selectedOption.id));

    setErrors({
      ...errors,
      countryId: ''
    });

    setIsDisabled(false);
  };

  const onChangeCity = (selectedOption) => {
    setVendor({
      ...vendor,
      cityId: selectedOption.id
    });

    setErrors({
      ...errors,
      cityId: ''
    });

    setIsDisabled(false);
  };

  const onSaveButtonClick = (e) => {
    e.preventDefault();

    console.log('hello');

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
      console.log('all clear');
      dispatch(actions.vendorActions.addVendor(vendor));
      onSave();
    } else {
      setIsDisabled(true);
      console.log('not ok');
      console.log();
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
          options = {countriesList}
          initialValue = {country}
          label = "Country"
          placeholder = "Select country"
          onChange = {onChangeCountry}
          error = {errors.countryId}
        />
        <SelectField
          options = {selectedCitiesList}
          initialValue = {city || ''}
          label = "City"
          placeholder = "Select city"
          onChange = {onChangeCity}
          error = {errors.cityId}
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
        touched = {touched.description}
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
