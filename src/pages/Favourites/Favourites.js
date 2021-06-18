import React from 'react';
import styles from './Favourites.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Favourites() {
  return (
    <div className = {styles.container}>
      <Header/>
      <main className={styles.contentWrapper}>Favourites page</main>
      <Footer />
    </div>
  );
}

export default Favourites;
