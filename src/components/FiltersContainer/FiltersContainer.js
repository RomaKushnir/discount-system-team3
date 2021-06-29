import { useState } from 'react';
import styles from './FiltersContainer.module.scss';
import Button from '../Button';
import SelectField from '../SelectField';
import TextInput from '../TextInput';

const inputStyles = {
  width: '200px',
  marginRight: '10px'
};

function FiltersContainer({
  onApplyButtonClick,
  onChangeCountry,
  onChangeCity,
  onChangeCategory,
  onSearchVendor,
  onSearchInputChange,
  countriesList,
  citiesList,
  categoriesList,
  vendorsList
}) {
  const [country, setCountry] = useState({
    value: 'Ukraine',
    label: 'Ukraine'
  }); // temporary, should be user country

  const onChangeSearchInput = (e) => {
    onSearchInputChange(e.target.value);
  };
  const onChangeVendorInput = (e) => {
    onSearchVendor(e.target.value);
  };

  const onChangeCountries = (selectedOption) => {
    onChangeCountry(selectedOption);
    setCountry(selectedOption);
  };

  const onChangeCities = (selectedOption) => {
    onChangeCity(selectedOption);
  };

  const onChangeCategories = (selectedOption) => {
    onChangeCategory(selectedOption);
  };

  return (
    <div className = {styles.container}>
      <div className = {styles.filtersContainer}>
        <div className = {styles.smallColumn}>
          <div className = {styles.filter}>
            <SelectField
              initialValue = {country} // temporary. Should be user country later
              options = {countriesList}
              label = "Country"
              onChange = {onChangeCountries}
            />
            </div>
            <div className = {styles.filter}>
              <SelectField
                options = {country !== null ? citiesList.filter((el) => el.country === country.value) : citiesList}
                // options = {cities}
                label = "City"
                onChange = {onChangeCities}
              />
            </div>
        </div>
        <div className = {styles.smallColumn}>
          {categoriesList && <div className = {styles.filter}>
            <SelectField
              options = {categoriesList}
              label = "Category"
              onChange = {onChangeCategories}
            />
          </div>}
          {vendorsList && <div className = {styles.filter}>
            <TextInput
              onValueChange = {onChangeVendorInput}
              label = "Vendor"
              name = "vendorSearch"
              placeholder = "Search..."
              type = "search"
              style = {inputStyles}
            />
          </div>}
        </div>
      </div>
      <div className = {styles.inputButtonColumn}>
        <div className = {styles.inputContainer}>
          <TextInput
            onValueChange = {onChangeSearchInput}
            label = "Search"
            name = "Search"
            placeholder = "Search..."
            type = "search"
            style = {inputStyles}
          />
        </div>
        <div className = {styles.buttonContainer}>
        <Button
          btnText = "Apply"
          onClick = {onApplyButtonClick}
        />
        </div>
      </div>
    </div>
  );
}

export default FiltersContainer;
