import React from 'react';
import styles from './Categories.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Categories() {
  return (
    <div className = {styles.container}>
      <Header/>
      <main className={styles.contentWrapper}>Categories page</main>
      <Footer />
    </div>
  );
}

export default Categories;
