<<<<<<< HEAD
import React, { Component } from "react";
import styles from "./ProfilePage.module.scss";
import LoadUserJabs from "../LoadUserJabs/LoadUserJabs";
=======
import React, {Component} from 'react';
import styles from './ProfilePage.module.scss';
import LoadUserJabs from '../LoadUserJabs/LoadUserJabs';
>>>>>>> master

class ProfilePage extends Component {
  constructor() {
    super();

    this.state = {};
  }

<<<<<<< HEAD
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
=======
        }
    }



    render() {
        return(
            <div>
                <div className={styles.delete_icon}>
                <h1>Delete Your Jabs</h1>
                <img src="https://images.vexels.com/media/users/3/158148/isolated/preview/9043e523c85dcaeb815975c32cffd879-sad-open-mouth-icon-by-vexels.png" alt=""/>
                </div>
                <LoadUserJabs />
            </div>
        )
    }
>>>>>>> master
}

export default ProfilePage;
