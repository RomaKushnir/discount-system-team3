import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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

  const countryMemoized = useMemo(
    () => countriesOptions.find(
      (el) => el.countryCode === filters.country
    ) || null, [countriesOptions, filters]
  );

  const categoriesOptionsMemoized = useMemo(
    () => categoriesOptions.find(
      (el) => el.id === Number(filters.category)
    ) || null, [categoriesOptions, filters]
  );

  const sortOptionMemoized = useMemo(
    () => sortOptions.find(
      (el) => el.value === filters.sort
    ), [sortOptions, filters]
  );

  return (
    <div className = {styles.container}>
      <div className = {styles.filtersContainer}>
          <div className = {styles.filter}>
            <SelectField
              value = {countryMemoized}
              options = {countriesOptions}
              label = {t('country')}
              onChange = {onChangeCountries}
            />
            </div>
            <div className = {styles.filter}>
              <SelectField
                options = {citiesOptions}
                label = {t('city')}
                onChange = {onChangeCities}
                value = {{ value: filters.city, label: filters.city }}
              />
            </div>
          <div className = {styles.filter}>
            <SelectField
              options = {categoriesOptions}
              label = {t('category')}
              onChange = {onChangeCategories}
              value = {categoriesOptionsMemoized}
            />
          </div>
          <div className = {styles.filter}>
            <SelectField
              options = {vendorsTypeaheadOptions}
              value = {{ value: filters.vendorTitle, label: filters.vendorTitle }}
              label = {t('vendor_min_3_chars')}
              name = "vendorId"
              onChange = {(option) => onVendorSelectOptionChange(option)}
              onInputChange={(characters) => onVendorSelectInputChange(characters)}
              onBlur = {onVendorSelectBlur}
            />
          </div>
          <div className = {styles.filter}>
            <TextInput
              onValueChange = {onChangeSearchInput}
              label = {t('search')}
              name = "Search"
              placeholder = {`${t('search')}...`}
              type = "search"
              style = {inputStyles}
              value = {filters.description || filters.shortDescription || ''}
            />
          </div>
          <div className = {styles.filter}>
            <SelectField
              value = {sortOptionMemoized }
              options={sortOptions}
              onChange={onSortFilterChange}
              isClearable={false}
              label = {t('sort')}
              className = {styles.filterSort}
            />
          </div>
        <div className = {styles.buttonContainer}>
        <Button
          btnText = {t('apply')}
          onClick = {onApplyButtonClick}
        />
        </div>
      </div>
    </div>
  );
}

export default FiltersContainer;
