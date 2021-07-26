import { useSelector } from 'react-redux';
import styles from './PageWrapper.module.scss';
import Header from '../Header';
import Footer from '../Footer';

function PageWrapper({ children }) {
  const isMobileNavOpen = useSelector((state) => state.userReducer.mobileNavigationState);

  return (
    <div className = {`${styles.container} ${isMobileNavOpen ? styles.mobileNavOpen : ''}`}>
      <Header/>
      <main className={styles.contentWrapper}>{children}</main>
      <Footer />
    </div>
  );
}

export default PageWrapper;
