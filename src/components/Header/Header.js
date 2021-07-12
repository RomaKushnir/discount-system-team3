import { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Languages } from '../../i18n';
// import getLanguage from '../../utilities/getLanguage';
import * as actions from '../../store/actions';
import Routes from '../../routes';
import styles from './Header.module.scss';
import OutlineButton from '../OutlineButton';
import isAdmin from '../../utilities/isAdmin';
import SelectField from '../SelectField';

const linkStyles = styles.navItemLink;
const navItemStyles = styles.navItem;

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const language = localStorage.getItem('lang');
  const [lang, setLang] = useState(language);
  const { t, i18n } = useTranslation();
  const changeLanguage = (option) => {
    const lng = option.value;
    setLang(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

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
          >{t('categories')}</NavLink>}
          </li>
          <li className = {navItemStyles} data-admin="true">
          {isAdmin(user) && <NavLink
            to={Routes.STATISTICS}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >{t('statistics')}</NavLink>}
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={Routes.VENDORS}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >{t('vendors')}</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={Routes.MY_DISCOUNTS}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >{t('my_discounts')}</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={Routes.FAVOURITES}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >{t('favourites')}</NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.switchLang}>
        <SelectField
          value={Languages.find((el) => el.value === lang)}
          onChange={changeLanguage}
          options = {Languages}
          isClearable = {false}
          containerStyle = {{ width: '80px' }}
        />
      </div>
      <OutlineButton
        btnText = {t('logout')}
        onClick = {onLogoutClick}
      />
    </header>
  );
}

export default Header;
