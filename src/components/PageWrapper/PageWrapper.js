import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './PageWrapper.module.scss';
import Header from '../Header';
import Footer from '../Footer';

function PageWrapper({ children }) {
  return (
    <div className = {styles.container}>
      <Header/>
      <main className={styles.contentWrapper}>{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default PageWrapper;
