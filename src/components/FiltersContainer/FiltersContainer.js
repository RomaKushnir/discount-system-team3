import { useSelector } from 'react-redux';
import styles from './FiltersContainer.module.scss';
import Button from '../Button';
import SelectField from '../SelectField';
import TextInput from '../TextInput';
import {
  getTypeaheadVendorsOptions, getCountriesOptions, getCitiesOptions,
  getCategoriesOptions
} from '../../store/selectors';
import useVendorTypeahead from '../../utilities/useVendorTypeahead';

const inputStyles = {
  width: '200px',
  marginRight: '10px'
};

function FiltersContainer({
  onApplyButtonClick,
  onChangeCountry,
  onChangeCity,
  onChangeCategory,
  onSearchInputChange,
  filters,
  onVendorSelectOptionChange,
  sortOptions,
  onSortFilterChange
}) {
  const [onVendorSelectInputChange, onVendorSelectBlur] = useVendorTypeahead();
  const vendorsTypeaheadOptions = useSelector(getTypeaheadVendorsOptions);
  const countriesOptions = useSelector(getCountriesOptions);
  const citiesOptions = useSelector(getCitiesOptions);
  const categoriesOptions = useSelector(getCategoriesOptions);

  const onChangeSearchInput = (e) => {
    onSearchInputChange(e.target.value);
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
          <div className = {styles.filter}>
            <SelectField
              value = {{ value: filters?.country, label: filters?.country } || null}
              options = {countriesOptions}
              label = "Country"
              onChange = {onChangeCountries}
            />
            </div>
            <div className = {styles.filter}>
              <SelectField
                options = {citiesOptions.filter((el) => el.country === filters?.country) || citiesOptions}
                label = "City"
                onChange = {onChangeCities}
                value = {{ value: filters?.city, label: filters?.city } || null}
              />
            </div>
          <div className = {styles.filter}>
            <SelectField
              options = {categoriesOptions}
              label = "Category"
              onChange = {onChangeCategories}
              value = {categoriesOptions.find((el) => el.id === +filters.category) || null}
            />
          </div>
          <div className = {styles.filter}>
            <SelectField
              options = {vendorsTypeaheadOptions}
              value = {{ value: filters?.title, label: filters?.title } || ''}
              label = "Vendor (Min 3 chars)"
              name = "vendorId"
              onChange = {(option) => onVendorSelectOptionChange(option)}
              onInputChange={(characters) => onVendorSelectInputChange(characters)}
              onBlur = {onVendorSelectBlur}
            />
          </div>
          <div className = {styles.filter}>
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
          <div className = {styles.filter}>
            <SelectField
              value = {{ value: filters?.sort, label: filters?.sort } || null}
              options={sortOptions}
              onChange={onSortFilterChange}
              isClearable={false}
              label = "Sort"
              className = {styles.filterSort}
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
