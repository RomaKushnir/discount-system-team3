import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import Routes from '../../routes';
import styles from './Header.module.scss';
import OutlineButton from '../OutlineButton';
import isAdmin from '../../utilities/isAdmin';

const linkStyles = styles.navItemLink;
const navItemStyles = styles.navItem;

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.userReducer.user);

  const onLogoutClick = () => {
    localStorage.removeItem('token');
    dispatch(actions.userActions.clearLoginStatus());
    dispatch(actions.userActions.clearGetUserStatus());
    history.push(Routes.ROOT);
  };
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">Discount<span className={styles.logoItem}>App</span></Link>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className = {navItemStyles} data-admin="true">
          {isAdmin(user) && <NavLink
            to={Routes.CATEGORIES}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >Categories</NavLink>}
          </li>
          <li className = {navItemStyles} data-admin="true">
          {isAdmin(user) && <NavLink
            to={Routes.STATISTICS}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >Statistics</NavLink>}
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
            to={Routes.MY_DISCOUNTS}
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
        onClick = {onLogoutClick}
      />
    </header>
  );
}

export default Header;
