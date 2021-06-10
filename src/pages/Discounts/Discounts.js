import React from 'react';
import styles from './Discounts.module.scss';
import FiltersContainer from '../../components/FiltersContainer';
import {
  countriesList,
  citiesList,
  categoriesList,
  vendorsList
} from '../../mockData';

function Discounts() {
  const onApplyButtonClick = (parameters) => {
    console.log(parameters);
  };

  return (
    <div className = {styles.container}>
      <h1>Discounts page</h1>
      <FiltersContainer
        onApplyButtonClick = {onApplyButtonClick}
        countriesList = {countriesList}
        citiesList = {citiesList}
        categoriesList = {categoriesList}
        vendorsList = {vendorsList}
      />
    </div>
  );
}

export default Discounts;
