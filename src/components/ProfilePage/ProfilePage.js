import React, { Component } from "react";
import styles from "./ProfilePage.module.scss";
import LoadAudio from "../LoadAudio/LoadAudio";

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className={styles.delete_icon}>
          <h1>Your Jabs</h1>
          <img
            src="https://images.vexels.com/media/users/3/158148/isolated/preview/9043e523c85dcaeb815975c32cffd879-sad-open-mouth-icon-by-vexels.png"
            alt=""
          />
        </div>
        <h3>View Audio in List View:</h3>
        <LoadAudio />
      </div>
    );
  }
}

export default ProfilePage;
