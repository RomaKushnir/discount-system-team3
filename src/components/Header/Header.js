import { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Languages } from '../../i18n';
import * as actions from '../../store/actions';
import Routes from '../../routes';
import styles from './Header.module.scss';
import OutlineButton from '../OutlineButton';
import isAdmin from '../../utilities/isAdmin';
import SelectField from '../SelectField';
import Vocabulary from '../../translations/vocabulary';

const linkStyles = styles.navItemLink;
const navItemStyles = styles.navItem;

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const language = useSelector((state) => state.userReducer.language);
  const [lang, setLang] = useState(language);
  const { t, i18n } = useTranslation();
  const changeLanguage = (option) => {
    const lng = option.value;
    setLang(lng);
    i18n.changeLanguage(lng);
    dispatch(actions.userActions.changeLanguage(lng));
  };
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
            <p className={linkStyles}>{t(Vocabulary.ADMIN)}</p>
            <div className={styles.dropDown}>
              <p data-admin="true">
                {isAdmin(user) && <NavLink
                  to={Routes.CATEGORIES}
                  className={linkStyles}
                  activeClassName={styles.activeClassName}
                >{t(Vocabulary.CATEGORIES)}</NavLink>}
              </p>
              <p data-admin="true">
                {isAdmin(user) && <NavLink
                  to={Routes.STATISTICS}
                  className={linkStyles}
                  activeClassName={styles.activeClassName}
                >{t(Vocabulary.STATISTICS)}</NavLink>}
              </p>
            </div>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={Routes.VENDORS}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >{t(Vocabulary.VENDORS)}</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={Routes.MY_DISCOUNTS}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >{t(Vocabulary.MY_DISCOUNTS)}</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={Routes.FAVOURITES}
            className={linkStyles}
            activeClassName={styles.activeClassName}
          >{t(Vocabulary.FAVOURITES)}</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
            <OutlineButton
              btnText = {t(Vocabulary.LOGOUT)}
              onClick = {onLogoutClick}
              className = {styles.mobileLogoutButton}
            />
          </li>
        </ul>
      </nav>
      }
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
        btnText = {t(Vocabulary.LOGOUT)}
        onClick = {onLogoutClick}
        className = {styles.desktopLogoutButton}
      />
    </header>
  );
}

export default Header;
