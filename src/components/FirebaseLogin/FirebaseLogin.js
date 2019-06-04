import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../firebase/index";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import styles from "./../FirebaseLogin/FirebaseLogin.module.scss";
import Icon from "../Pics/logo.png";
import Icon2 from "../Pics/jabber-app.png";

// firebase.initializeApp({
//   apiKey: "AIzaSyA0ifb48V1SfOyaVN4wc11PDf0LvQYVKvU",
//   authDomain: "jabber-dm22.firebaseapp.com"
// });

const auth = firebase.auth();
const storage = firebase.auth();

class FirebaseLogin extends Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: false
    };
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
    });
  }

  render() {
    console.log(firebase.auth()); // view user info we have available to work with
    return (
      <div className={styles.div1}>
        {auth.currentUser ? <Redirect to="/JabberMainPage" /> : null}
        <div className={styles.div2}>
          <div className={styles.Login}>
            {auth.currentUser ? (
              <>
                <img className={styles.Icon2} src={Icon2} />
                <img
                  className={styles.profilePic}
                  alt="profile picture"
                  src={firebase.auth().currentUser.photoURL}
                />
              </>
            ) : (
              <>
                <h1>- LOGIN -</h1>
                <img className={styles.Icon} src={Icon} />
              </>
            )}
            {this.state.isSignedIn ? (
              <span>
                <h3>Welcome,</h3>
                <h2>{firebase.auth().currentUser.displayName}</h2>
                <button
                  className={styles.signOut}
                  onClick={() => firebase.auth().signOut()}
                >
                  Sign Out
                </button>
              </span>
            ) : (
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default FirebaseLogin;
