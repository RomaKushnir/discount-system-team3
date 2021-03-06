import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerContent}>
        <p className={styles.slogan}>Save your money with Exadel</p>
        <p className={styles.copyright}>Copyright &copy; 2021 All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
