import { Link, NavLink, useHistory } from 'react-router-dom';
import { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import Routes from '../../routes';
import styles from './Header.module.scss';
import OutlineButton from '../OutlineButton';
import isAdmin from '../../utilities/isAdmin';
// import SelectField from '../SelectField';

const linkStyles = styles.navItemLink;
const navItemStyles = styles.navItem;

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isMobileMenuOpen, setMenuOpen] = useState(false);

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
      { isMobileMenuOpen
        ? <CloseIcon className={styles.burgerMenuIcon} onClick={() => setMenuOpen(!isMobileMenuOpen)}/>
        : <MenuIcon className={styles.burgerMenuIcon} onClick={() => setMenuOpen(!isMobileMenuOpen)}/>
      }
      {
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileNavOpened : ''}`}>
          <ul className={styles.navList}>
          <li className = {`${navItemStyles} ${styles.adminDropDownContainer}`} data-admin="true">
            <p className={linkStyles}>Admin</p>
            <div className={styles.dropDown}>
              <p data-admin="true">
                {isAdmin(user) && <NavLink
                  to={Routes.CATEGORIES}
                  className={linkStyles}
                  activeClassName={styles.activeClassName}
                >Categories</NavLink>}
              </p>
              <p data-admin="true">
                {isAdmin(user) && <NavLink
                  to={Routes.STATISTICS}
                  className={linkStyles}
                  activeClassName={styles.activeClassName}
                >Statistics</NavLink>}
              </p>
            </div>
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
          <li className = {navItemStyles} data-admin="false">
            <OutlineButton
              btnText = "Logout"
              onClick = {onLogoutClick}
              className = {styles.mobileLogoutButton}
            />
          </li>
        </ul>
        </nav>
      }
      <OutlineButton
        btnText = "Logout"
        onClick = {onLogoutClick}
        className = {styles.desktopLogoutButton}
      />
    </header>
  );
}

export default Header;
