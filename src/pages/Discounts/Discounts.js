import React from 'react';
import styles from './Discounts.module.scss';
import FiltersContainer from '../../components/FiltersContainer';
import countriesList from '../../mockData/countriesList';
import citiesList from '../../mockData/citiesList';
import categoriesList from '../../mockData/categoriesList';
import vendorsList from '../../mockData/vendorsList';
import Header from '../../components/Header';
import Routes from '../../routes';
import Footer from '../../components/Footer';

const navLinks = {
  categories: Routes.CATEGORIES,
  main: Routes.ROOT,
  vendors: Routes.VENDORS,
  discounts: Routes.DISCOUNTS
};

function Discounts() {
  const onApplyButtonClick = (parameters) => {
    console.log(parameters);
  };

  return (
    <div className = {styles.containerFluid}>
      <div className = {styles.container}>
      <Header
        mainLink = {navLinks.main}
        categoriesLink = {navLinks.categories}
        vendorsLink = {navLinks.vendors}
        discountsLink = {navLinks.discounts}
      />
      </div>
      <div className = {styles.container}>
      <FiltersContainer
        onApplyButtonClick = {onApplyButtonClick}
        countriesList = {countriesList}
        citiesList = {citiesList}
        categoriesList = {categoriesList}
        vendorsList = {vendorsList}
        className = {styles.discountsFilter}
      />
      </div>
      <Footer/>
    </div>
  );
}

export default Discounts;
