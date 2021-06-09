import React from 'react';
import styles from './Discounts.module.scss';
import FiltersContainer from '../../components/FiltersContainer';

function Discounts() {
  return (
    <div className = {styles.container}>
      <h1>Discounts page</h1>
      <FiltersContainer />
    </div>
  );
}

export default Discounts;
