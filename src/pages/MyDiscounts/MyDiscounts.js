import styles from './MyDiscounts.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function MyDiscounts() {
  return (
    <div className = {styles.container}>
      <Header/>
      <main className={styles.contentWrapper}>My discounts page</main>
      <Footer />
    </div>
  );
}

export default MyDiscounts;
