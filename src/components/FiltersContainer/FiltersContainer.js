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
  countriesList,
  citiesList,
  categoriesList,
  vendorsList
}) {
  const [searchWord, setSearchWord] = useState('');
  const [country, setCountry] = useState({
    value: 'Ukraine',
    label: 'Ukraine'
  }); // temporary, should be user country
  const [city, setCity] = useState(null);
  const [category, setCategory] = useState(null);
  const [vendorSearch, setVendorSearch] = useState(null);

  const onChangeInput = (e) => {
    console.log(e.target.value);
    setSearchWord(e.target.value);
  };
  const onChangeVendorInput = (e) => {
    console.log(e.target.value);
    setVendorSearch(e.target.value);
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
            onValueChange = {onChangeInput}
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
          onClick = {() => onApplyButtonClick(
            {
              searchWord,
              country,
              city,
              category,
              vendorSearch
            }
          )}
        />
        </div>
      </div>
    </div>
  );
}

export default FiltersContainer;
