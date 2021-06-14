import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import OutlineButton from "../OutlineButton";

const linkStyles = styles.navItemLink;
const navItemStyles = styles.navItem;
const activeLinkStyles = {
  borderBottom: "2px solid #40BFEF",
  padding: "0 0 5px 0"
};
const onClick = () => {
  console.log("click");
};

function Header({
  mainLink,
  categoriesLink,
  statisticsLink = "#",
  vendorsLink,
  discountsLink,
  favouritesLink = "#"
}) {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={mainLink}>Discount<span className={styles.logoItem}>App</span></Link>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className = {navItemStyles} data-admin="true">
          <NavLink
            to={categoriesLink}
            className={linkStyles}
            activestyles={activeLinkStyles}
          >Categories</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="true">
          <NavLink
            to={statisticsLink}
            className={linkStyles}
            activestyles={activeLinkStyles}
          >Statistics</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={vendorsLink}
            className={linkStyles}
            activestyles={activeLinkStyles}
          >Vendors</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={discountsLink}
            className={linkStyles}
            activestyles={activeLinkStyles}
          >My discounts</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={favouritesLink}
            className={linkStyles}
            activestyles={activeLinkStyles}
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
