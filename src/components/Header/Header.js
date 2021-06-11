import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import OutlineButton from "../OutlineButton";

export default function Header({
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

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={mainLink}>Discount<span className={styles.logo_item}>App</span></Link>
      <nav className={styles.nav}>
        <ul className={styles.nav_list}>
          <li className = {styles.nav_item} data-admin="true">
          <NavLink
            to={categoriesLink}
            className={styles.nav_item_link}
            activestyles={{
              borderBottom: "2px solid #40BFEF",
              padding: "0 0 5px 0"
            }}
          >Categories</NavLink>
          </li>
          <li className = {styles.nav_item} data-admin="true">
          <NavLink
            to={statisticsLink}
            className={styles.nav_item_link}
            activestyles={{
              borderBottom: "2px solid #40BFEF",
              padding: "0 0 5px 0"
            }}
          >Statistics</NavLink>
          </li>
          <li className = {styles.nav_item} data-admin="false">
          <NavLink
            to={vendorsLink}
            className={styles.nav_item_link}
            activestyles={{
              borderBottom: "2px solid #40BFEF",
              padding: "0 0 5px 0"
            }}
          >Vendors</NavLink>
          </li>
          <li className = {styles.nav_item} data-admin="false">
          <NavLink
            to={discountsLink}
            className={styles.nav_item_link}
            activestyles={{
              borderBottom: "2px solid #40BFEF",
              padding: "0 0 5px 0"
            }}
          >My discounts</NavLink>
          </li>
          <li className = {styles.nav_item} data-admin="false">
          <NavLink
            to={favouritesLink}
            className={styles.nav_item_link}
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
