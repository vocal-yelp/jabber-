import React from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase/index";
import styles from "./AppNavigation.module.scss";

export default function AppNavigation() {
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <button onClick={() => firebase.auth().signOut()}>Signout</button>
      </Link>
      <Link to="/JabberMainPage">
        <button>Jabber</button>
      </Link>
      <Link to="/MapContainer">
        <button>Map</button>
      </Link>
      <Link to="/ProfilePage">
        <button>Jabs</button>
      </Link>
    </div>
  );
}
