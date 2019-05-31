import React, { Component } from "react";
import styles from "./ProfilePage.module.scss";
import LoadUserJabs from "../LoadUserJabs/LoadUserJabs";

class ProfilePage extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className={styles.delete_icon}>
          <h1>Delete Your Jabs</h1>
          <img
            src="https://images.vexels.com/media/users/3/158148/isolated/preview/9043e523c85dcaeb815975c32cffd879-sad-open-mouth-icon-by-vexels.png"
            alt=""
          />
        </div>
        <LoadUserJabs />
      </div>
    );
  }
}

export default ProfilePage;
