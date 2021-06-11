import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import OutlineButton from "../OutlineButton";

function Header({
  mainLink,
  categoriesLink,
  statisticsLink = "#",
  vendorsLink,
  discountsLink,
  favouritesLink = "#"
}) {
  const onClick = () => {
    console.log("click");
  };
  const linkStyles = styles.navItemLink;
  const navItemStyles = styles.navItem;
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={mainLink}>Discount<span className={styles.logoItem}>App</span></Link>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className = {navItemStyles} data-admin="true">
          <NavLink
            to={categoriesLink}
            className={linkStyles}
            activestyles={{
              borderBottom: "2px solid #40BFEF",
              padding: "0 0 5px 0"
            }}
          >Categories</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="true">
          <NavLink
            to={statisticsLink}
            className={linkStyles}
            activestyles={{
              borderBottom: "2px solid #40BFEF",
              padding: "0 0 5px 0"
            }}
          >Statistics</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={vendorsLink}
            className={linkStyles}
            activestyles={{
              borderBottom: "2px solid #40BFEF",
              padding: "0 0 5px 0"
            }}
          >Vendors</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={discountsLink}
            className={linkStyles}
            activestyles={{
              borderBottom: "2px solid #40BFEF",
              padding: "0 0 5px 0"
            }}
          >My discounts</NavLink>
          </li>
          <li className = {navItemStyles} data-admin="false">
          <NavLink
            to={favouritesLink}
            className={linkStyles}
            activestyles={{
              borderBottom: "2px solid #40BFEF",
              padding: "0 0 5px 0"
            }}
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
