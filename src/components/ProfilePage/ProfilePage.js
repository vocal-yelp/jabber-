import React, { Component } from "react";
import styles from "./ProfilePage.module.scss";
import LoadUserJabs from "../LoadUserJabs/LoadUserJabs";
import firebase from "../firebase/index";
import axios from "axios";

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  //   blessed = () => {
  //     const auth = firebase.auth();
  //     axios.get(`/api/loadUserJabs/${auth.currentUser.uid}`).then(res => {
  //       console.log(res.data);
  //       this.setState({ URL: res.data });
  //     });
  //   };

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
