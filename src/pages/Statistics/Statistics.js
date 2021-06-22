import styles from './Statistics.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Statistics() {
  return (
    <div className = {styles.container}>
      <Header/>
      <main className={styles.contentWrapper}>Statistics page</main>
      <Footer />
    </div>
  );
}

export default Statistics;
