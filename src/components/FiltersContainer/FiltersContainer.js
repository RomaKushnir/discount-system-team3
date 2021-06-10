import React, { useState } from 'react';
import styles from './FiltersContainer.module.scss';
import Button from '../Button';
import SelectField from '../SelectField';

function FiltersContainer({
  onApplyButtonClick,
  countriesList,
  citiesList,
  categoriesList,
  vendorsList
}) {
  const [searchWord, setSearchWord] = useState('');
  const [countries, setCountries] = useState(countriesList[0]);
  const [cities, setCities] = useState(citiesList[0]);
  const [categories, setCategories] = useState(categoriesList[0]);
  const [vendor, setVendor] = useState(vendorsList[0]);

  const onChangeInput = (e) => {
    console.log(e.target.value);
    setSearchWord(e.target.value);
  };

  const onChangeCountries = (selectedOption) => {
    console.log(selectedOption);
    setCountries(selectedOption);
  };

  const onChangeCities = (selectedOption) => {
    console.log(selectedOption);
    setCities(selectedOption);
  };

  const onChangeCategories = (selectedOption) => {
    console.log(selectedOption);
    setCategories(selectedOption);
  };

  const onChangeVendor = (selectedOption) => {
    console.log(selectedOption);
    setVendor(selectedOption);
  };

  return (
    <div className = {styles.container}>
      <div className = {styles.filtersContainer}>
        <div className = {styles.smallColumn}>
          <SelectField
            initialValue = {countriesList[0]}
            options = {countriesList}
            label = 'Country'
            onChange = {onChangeCountries}
          />
          <SelectField
            initialValue = {citiesList[0]}
            options = {citiesList}
            label = 'City'
            onChange = {onChangeCities}
          />
        </div>
        <div className = {styles.smallColumn}>
            <SelectField
              initialValue = {categoriesList[0]}
              options = {categoriesList}
              label = 'Category'
              onChange = {onChangeCategories}
            />
            <SelectField
              initialValue = {vendorsList[0]}
              options = {vendorsList}
              label = 'Vendor'
              onChange = {onChangeVendor}
            />
        </div>
      </div>
      <div className = {styles.inputContainer}>
        <input onChange = {onChangeInput}/>
      </div>
      <div className = {styles.buttonContainer}>
      <Button
        btnText = 'Apply'
        onClick = {() => onApplyButtonClick(
          {
            searchWord,
            countries,
            cities,
            categories,
            vendor
          }
        )}
      />
      </div>
    </div>
  );
}

export default FiltersContainer;
