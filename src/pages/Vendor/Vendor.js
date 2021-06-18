import React from 'react';
// import styles from './Vendor.module.scss';
import { useParams } from 'react-router-dom';
import DiscountCard from '../../components/discountCard';
// import Header from '../../components/Header/Header';

function Vendor() {
  const { id } = useParams();// id value from url
  console.log('vendor id:', id);
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
