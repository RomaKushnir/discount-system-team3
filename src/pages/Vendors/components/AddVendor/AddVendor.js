import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './AddVendor.module.scss';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import SelectField from '../../../../components/SelectField';
import * as actions from '../../../../store/actions';

const inputStyles = {
  width: '300px'
};

function AddVendorModal({ onSave }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const currentUserCountryId = 1; // temporary

  const countriesList = useSelector((state) => state.locationReducer.countriesList);
  const selectedCitiesList = useSelector((state) => state.locationReducer.selectedCities);
  const userCountry = countriesList.find((el) => el.id === currentUserCountryId);

  const onNameChange = (e) => {
    setTitle(e.target.value);
  };

  const onChangeCountry = (selectedOption) => {
    setCountry(selectedOption);
    dispatch(actions.locationActions.getSelectedCitiesList(selectedOption.id));
  };

  const onChangeCity = (selectedOption) => {
    setCity(selectedOption);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onSaveButtonClick = (e) => {
    e.preventDefault();
    dispatch(actions.vendorActions.addVendor({
      title,
      email,
      description,
      imageUrl,
      country,
      city
    }));
    onSave();
  };

  return (
    <form className = {styles.container}>
      <div className = {styles.inputs}>
        <TextInput
          onValueChange = {onNameChange}
          placeholder = "Company name"
          style = {inputStyles}
          name = "companyName"
          type = "text"
        />
        <TextInput
          onValueChange = {onEmailChange}
          placeholder = "Email"
          style = {inputStyles}
          name = "email"
          type="email"
        />
        <TextInput
          onValueChange = {onImageUrlChange}
          placeholder = "Image URL"
          style = {inputStyles}
          name = "imageUrl"
          type = "text"
        />
        <SelectField
          options = {countriesList}
          initialValue = {userCountry}
          label = "Country"
          placeholder = "Select country"
          onChange = {onChangeCountry}
        />
        <SelectField
          options = {selectedCitiesList}
          label = "City"
          placeholder = "Select city"
          onChange = {onChangeCity}
        />
      </div>
      <textarea
        onChange = {onDescriptionChange}
        className = {styles.description}
        placeholder = "Description"
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
