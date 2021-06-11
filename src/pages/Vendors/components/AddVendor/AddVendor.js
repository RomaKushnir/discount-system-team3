import React, { useState } from 'react';
import styles from './AddVendor.module.scss';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import SelectField from '../../../../components/SelectField';
import countriesList from '../../../../mockData/countriesList';
import citiesList from '../../../../mockData/citiesList';

const inputStyles = {
  width: '300px'
};

function AddVendorModal() {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const onNameChange = (e) => {
    setTitle(e.target.value);
  };

  const onChangeCountry = (selectedOption) => {
    console.log(selectedOption);
    setCountry(selectedOption);
  };

  const onChangeCity = (selectedOption) => {
    console.log(selectedOption);
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
    console.log(title, email, description, imageUrl, country, city);
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
          label = "Country"
          placeholder = "Select country"
          onChange = {onChangeCountry}
        />
        <SelectField
          options = {citiesList}
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
