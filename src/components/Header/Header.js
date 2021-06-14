import { Link, NavLink } from 'react-router-dom';
import Routes from '../../routes';
import styles from './Header.module.scss';
import OutlineButton from '../OutlineButton';

const linkStyles = styles.navItemLink;
const navItemStyles = styles.navItem;
const activeLinkStyles = {
  borderBottom: '2px solid #40BFEF',
  padding: '0 0 5px 0'
};
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
            activeStyle={activeLinkStyles}
          >Categories</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="true">
          <NavLink
            to={Routes.STATISTICS}
            className={linkStyles}
            activeStyle={activeLinkStyles}
          >Statistics</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={Routes.VENDORS}
            className={linkStyles}
            activeStyle={activeLinkStyles}
          >Vendors</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={Routes.DISCOUNTS}
            className={linkStyles}
            activeStyle={activeLinkStyles}
          >My discounts</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={Routes.FAVOURITES}
            className={linkStyles}
            activeStyle={activeLinkStyles}
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
