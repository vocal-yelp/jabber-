import React, { Component } from "react";
import MapContainer from "../MapContainer/MapContainer";
import styles from "./ProfilePage.module.scss";
import LoadUserJabs from "../LoadUserJabs/LoadUserJabs";
import AppNavigation from "../AppNavigation/AppNavigation";

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <AppNavigation />
        <div className={styles.delete_icon}>
          <h1>Delete Your Jabs</h1>
        </div>
        <LoadUserJabs />
      </div>
    );
  }
}

export default ProfilePage;
