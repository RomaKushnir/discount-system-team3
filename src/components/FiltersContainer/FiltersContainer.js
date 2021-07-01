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
  vendorsList,
  filters
}) {
  const onChangeSearchInput = (e) => {
    onSearchInputChange(e.target.value);
  };
  const onChangeVendorInput = (e) => {
    onSearchVendor(e.target.value);
  };

  const onChangeCountries = (selectedOption) => {
    onChangeCountry(selectedOption);
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
              initialValue = {{ value: filters?.country, label: filters?.country } || null}
              options = {countriesList}
              label = "Country"
              onChange = {onChangeCountries}
            />
            </div>
            <div className = {styles.filter}>
              <SelectField
                options = {citiesList.filter((el) => el.country === filters?.country) || citiesList}
                label = "City"
                onChange = {onChangeCities}
                initialValue = {{ value: filters?.city, label: filters?.city } || null}
              />
            </div>
        </div>
        <div className = {styles.smallColumn}>
          {categoriesList && <div className = {styles.filter}>
            <SelectField
              options = {categoriesList}
              label = "Category"
              onChange = {onChangeCategories}
              initialValue = {categoriesList.find((el) => el.id === +filters.category) || null}
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
              value = {filters?.title || ''}
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
            value = {filters?.description || ''}
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
