import React, { Component } from "react";
import LoadUserJabs from "../LoadUserJabs/LoadUserJabs";
import styles from "./ProfilePage.module.scss";
import sadlip from "./sadlip.png";
import AppNavigation from "../AppNavigation/AppNavigation";

class ProfilePage extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className={styles.jabs_body}>
        <AppNavigation />
        <section className={styles.profile_page_top}>
          <div className={styles.delete_icon}>
            <h1>Jab Removal</h1>
            <img src={sadlip} alt="" />
          </div>
          <LoadUserJabs />
        </section>
        <section className={styles.profile_page_bottom} />
      </div>
    );
  }
}

export default ProfilePage;
