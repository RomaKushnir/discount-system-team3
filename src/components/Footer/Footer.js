import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={`container ${styles['footer-wrapper']}`}>
      <p className={styles.slogan}>Save your money with Exadel</p>
      <p className={styles.copyright}>Copyright &copy; 2021 All rights reserved.</p>
    </footer>
  );
}

export default Footer;
