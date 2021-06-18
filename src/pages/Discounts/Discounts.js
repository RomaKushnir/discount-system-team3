import React from 'react';
import styles from './Discounts.module.scss';
import FiltersContainer from '../../components/FiltersContainer';
import countriesList from '../../mockData/countriesList';
import citiesList from '../../mockData/citiesList';
import categoriesList from '../../mockData/categoriesList';
import vendorsList from '../../mockData/vendorsList';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ItemActionButton from '../../components/ItemActionButton';
import SelectField from '../../components/SelectField';
import discountsList from '../../mockData/discountsList';
import DiscountList from './components/DiscountList/DiscountList';
import OutlineButton from '../../components/OutlineButton';

const onActionClick = () => {
  console.log('click');
};
const onChange = () => {
  console.log('change');
};
const onBlur = () => {
  console.log('blur');
};
const onShowMoreClick = () => {
  console.log('show more');
};
const options = ['Vendors', 'Category', 'Discount', 'Expiration Date'];

function Discounts() {
  const onApplyButtonClick = (parameters) => {
    console.log(parameters);
  };

  return (
    <div className = {styles.containerFluid}>
      <div className = {styles.container}>
      <Header/>
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
      <div className = {styles.discountsActions}>
        <ItemActionButton
          title = "Add new discount"
          name = "newDiscount"
          onActionClick = {onActionClick}
          className = {styles.discountsAdd}
        />
        <SelectField
          options = {options}
          initialValue = "Expiration Date"
          label = "Sort By"
          onChange = {onChange}
          isLoading = "false"
          className = ""
          onBlur = {onBlur}
        />
      </div>
      <div className = {styles.discountsContainer}>
        <DiscountList
          discounts = {discountsList}
        />
      </div>
      <div className = {styles.discountsShowMoreBtnWrap}>
        <OutlineButton
          btnText = "Show more"
          onClick = {onShowMoreClick}
          className = {styles.discountsShowMoreBtn}
        />
      </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Discounts;
