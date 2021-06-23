import { useState } from 'react';
import styles from './FiltersContainer.module.scss';
import Button from '../Button';
import SelectField from '../SelectField';
import TextInput from '../TextInput';

function FiltersContainer({
  onApplyButtonClick,
  countriesList,
  citiesList,
  categoriesList,
  vendorsList
}) {
  const [searchWord, setSearchWord] = useState('');
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [category, setCategory] = useState(null);
  const [vendor, setVendor] = useState(null);

  const onChangeInput = (e) => {
    console.log(e.target.value);
    setSearchWord(e.target.value);
  };

  const onChangeCountries = (selectedOption) => {
    console.log(selectedOption);
    setCountry(selectedOption);
  };

  const onChangeCities = (selectedOption) => {
    console.log(selectedOption);
    setCity(selectedOption);
  };

  const onChangeCategories = (selectedOption) => {
    console.log(selectedOption);
    setCategory(selectedOption);
  };

  const onChangeVendor = (selectedOption) => {
    console.log(selectedOption);
    setVendor(selectedOption);
  };

  return (
    <div className = {styles.container}>
      <div className = {styles.filtersContainer}>
        <div className = {styles.smallColumn}>
          <div className = {styles.filter}>
            <SelectField
              initialValue = {countriesList[0]} // temporary. Should be user country later
              options = {countriesList}
              label = "Country"
              onChange = {onChangeCountries}
            />
            </div>
            <div className = {styles.filter}>
              <SelectField
                options = {citiesList}
                label = "City"
                onChange = {onChangeCities}
              />
            </div>
        </div>
        <div className = {styles.smallColumn}>
          <div className = {styles.filter}>
            <SelectField
              options = {categoriesList}
              label = "Category"
              onChange = {onChangeCategories}
            />
          </div>
          <div className = {styles.filter}>
            <SelectField
              options = {vendorsList}
              label = "Vendor"
              onChange = {onChangeVendor}
            />
          </div>
        </div>
      </div>
      <div className = {styles.inputContainer}>
        <TextInput
          onValueChange = {onChangeInput}
          label = "Search"
          name = "Search"
          placeholder = "Search..."
          type = "text"
        />
      </div>
      <div className = {styles.buttonContainer}>
      <Button
        btnText = "Apply"
        onClick = {() => onApplyButtonClick(
          {
            searchWord,
            country,
            city,
            category,
            vendor
          }
        )}
      />
      </div>
    </div>
  );
}

export default FiltersContainer;
