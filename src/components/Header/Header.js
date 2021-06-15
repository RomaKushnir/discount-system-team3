import { Link, NavLink } from 'react-router-dom';
import Routes from '../../routes';
import styles from './Header.module.scss';
import OutlineButton from '../OutlineButton';

const linkStyles = styles.navItemLink;
const navItemStyles = styles.navItem;

const onClick = () => {
  console.log('click');
};

function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">Discount<span className={styles.logoItem}>App</span></Link>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className = {navItemStyles} data-admin="true">
          <NavLink
            to={Routes.CATEGORIES}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >Categories</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="true">
          <NavLink
            to={Routes.STATISTICS}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >Statistics</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={Routes.VENDORS}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >Vendors</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={Routes.DISCOUNTS}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >My discounts</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={Routes.FAVOURITES}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >Favourites</NavLink>
          </li>
        </ul>
      </nav>
      <OutlineButton
        btnText = "Logout"
        onClick = {onClick}
      />
    </header>
  );
}

export default Header;
