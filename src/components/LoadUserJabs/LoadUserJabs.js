import React, { Component } from "react";
import firebase from "../firebase/index";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import styles from "./LoadUserJabs.module.scss";

const auth = firebase.auth();

export default class LoadUserJabs extends Component {
  constructor() {
    super();

    this.state = {
      userJabs: []
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      axios.get(`/api/loadUserJabs/${auth.currentUser.uid}`).then(res => {
        console.log(res.data);
        this.setState({ userJabs: res.data });
      });
    });
  }

  deleteJab = date => {
    axios
      .delete("/api/deleteJab/", {
        data: { uid: auth.currentUser.uid, date: date }
      })
      .then(res => {})
      .then(res => console.log(res));
    this.getUpdate();
  };

  getUpdate() {
    axios.get(`/api/loadUserJabs/${auth.currentUser.uid}`).then(res => {
      console.log("hit");
      this.setState({ userJabs: res.data });
    });
  }

  render() {
    const clips = this.state.userJabs.map((clip, index) => {
      return (
        <div className={styles.mainDiv} key={index}>
          <div className={styles.div2}>
            <div className={styles.user_clips}>
              <audio controls src={clip.URL} />
              <button onClick={() => this.deleteJab(clip.date)}>X</button>
            </div>
            <h6>{clip.date}</h6>
          </div>
        </div>
      );
    });

    return <div className={styles.buttons}>{clips}</div>;
  }
}
