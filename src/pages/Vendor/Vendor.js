import React from 'react';
// import styles from './Vendor.module.scss';
import DiscountCard from '../../components/discountCard';
// import Header from '../../components/Header/Header';

function Vendor() {
  return (

    <div>
    <DiscountCard
    title = "Donzo"
    category = "Food"
    company = "Donzo Pizza"
    description = "Pizza tasty"
    discount = "10%"
    />
    </div>
  );
}

export default Vendor;
