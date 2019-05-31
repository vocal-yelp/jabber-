import React from "react";
import { Link } from "react-router-dom";
import styles from "./AppNavigation.module.scss";

export default function AppNavigation() {
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <button className={styles.navButtons}>Login</button>
      </Link>
      <Link to="/JabberMainPage">
        <button className={styles.navButtons}>Jab</button>
      </Link>
      <Link to="/ProfilePage">
        <button className={styles.navButtons}>My Jabs</button>
      </Link>
    </div>
  );
}
