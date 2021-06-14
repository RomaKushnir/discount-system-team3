import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './AddVendor.module.scss';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import SelectField from '../../../../components/SelectField';
import * as actions from '../../../../store/actions';
// import titleValidation from '../../../../utilities/titleValidation';
// import emailValidation from '../../../../utilities/emailValidation';

const inputStyles = {
  width: '300px'
};

// const validate = {
//   title: titleValidation,
//   email: emailValidation
// };

function AddVendorModal({ onSave, selectedVendor }) {
  const dispatch = useDispatch();

  const [vendor, setVendor] = useState(selectedVendor);

  const countriesList = useSelector((state) => state.locationReducer.countriesList);
  const selectedCitiesList = useSelector((state) => state.locationReducer.selectedCities);
  const country = countriesList.find((el) => el.id === selectedVendor.countryId);
  const city = selectedCitiesList.find((el) => el.id === selectedVendor.cityId);

  const onValueChange = (e) => {
    setVendor({
      ...vendor,
      [e.target.name]: e.target.value
    });
  };

  const onChangeCountry = (selectedOption) => {
    setVendor({
      ...vendor,
      countryId: selectedOption.id
    });
    dispatch(actions.locationActions.getSelectedCitiesList(selectedOption.id));
  };

  const onChangeCity = (selectedOption) => {
    setVendor({
      ...vendor,
      cityId: selectedOption.id
    });
  };

  const onSaveButtonClick = (e) => {
    e.preventDefault();
    dispatch(actions.vendorActions.addVendor(vendor));
    onSave();
  };

  return (
    <form className = {styles.container}>
      <div className = {styles.inputs}>
        <TextInput
          onValueChange = {onValueChange}
          placeholder = "Company name"
          style = {inputStyles}
          name = "title"
          type = "text"
          value = {vendor.title}
        />
        <TextInput
          onValueChange = {onValueChange}
          placeholder = "Email"
          style = {inputStyles}
          name = "email"
          type="email"
          value = {vendor.email}
        />
        <TextInput
          onValueChange = {onValueChange}
          placeholder = "Image URL"
          style = {inputStyles}
          name = "imageUrl"
          type = "text"
          value = {vendor.imageUrl}
        />
        <SelectField
          options = {countriesList}
          initialValue = {country}
          label = "Country"
          placeholder = "Select country"
          onChange = {onChangeCountry}
        />
        <SelectField
          options = {selectedCitiesList}
          initialValue = {city || ''}
          label = "City"
          placeholder = "Select city"
          onChange = {onChangeCity}
        />
      </div>
      <textarea
        onChange = {onValueChange}
        className = {styles.description}
        placeholder = "Description"
        value = {vendor.description}
        name = "description"
      />
      <div className = {styles.buttonContainer}>
        <Button
          btnText = "Save"
          onClick = {onSaveButtonClick}
        />
      </div>
    </form>
  );
}

export default AddVendorModal;
