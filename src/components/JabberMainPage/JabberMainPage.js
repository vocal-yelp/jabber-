<<<<<<< HEAD
import React, { Component } from "react";
import styles from "./JabberMainPage.module.scss";
import firebase from "../firebase/index";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadJabs from "../LoadJabs/LoadJabs";
=======
import React, {Component} from 'react';
import styles from './JabberMainPage.module.scss';
import firebase from '../firebase/index';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadJabs from '../LoadJabs/LoadJabs';

>>>>>>> master

const storage = firebase.storage();
const auth = firebase.auth();

export default class JabberMainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recording: false,
      recordStatus: "Pause",
      blob: "",
      blobURL: "",
      URL
<<<<<<< HEAD
    };
  }
=======
  };
}
>>>>>>> master

  async startUpMedia() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    this.chunks = [];
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
    this.startRecording();
  }

  startRecording() {
    this.chunks = [];
    this.mediaRecorder.start(10);
    this.setState({ recording: true });
  }

  stopRecording(e) {
    e.preventDefault();
    this.mediaRecorder.stop();
    this.setState({ recording: false });
    this.saveAudio();
  }

<<<<<<< HEAD
  async saveAudio() {
    const uid = firebase.auth().currentUser.uid;
    const name = firebase.auth().currentUser.displayName;
    const date = new Date().toString().substr(0, 24);
    console.log(date);
    const blob = await new Blob(this.chunks, { type: "audio/webm" });
    console.log(blob);
    this.setState({ blob });
    await storage
      .ref("audio/")
      .child(`${name}: ${uid}/${date}`)
      .put(this.state.blob);

    const folderReturn = storage.ref(`audio/${name}: ${uid}/${date}`);

    folderReturn.getDownloadURL().then(res => {
      axios
        .post("/api/sendUserInfo", {
          name,
          uid,
          date,
          URL: res
        })
        .then(response => console.log(response))
        .catch(err => console.log(err));
    });
  }

  pause() {
    const { recordStatus } = this.state;
    if (recordStatus === "Pause") {
      this.setState({ recordStatus: "Resume" });
    } else {
      this.setState({ recordStatus: "Pause" });
=======
async saveAudio() {
const uid = firebase.auth().currentUser.uid;
const name = firebase.auth().currentUser.displayName;
const date = new Date().toString().substr(0, 24);
console.log(date)
const blob = await new Blob(this.chunks, {type: 'audio/webm'}); console.log(blob);
this.setState({blob}) 
await storage.ref("audio/").child(`${name}: ${uid}/${date}`).put(this.state.blob);

const folderReturn = storage.ref(`audio/${name}: ${uid}/${date}`);

folderReturn.getDownloadURL().then(res => {
    axios
    .post("/api/sendUserInfo", {
      name,
      uid,
      date,
      URL: res
    }).then(response => console.log(response)).catch(err => console.log(err));
})
}

pause() {
    const {recordStatus} = this.state
    if(recordStatus === "Pause")  {this.setState({recordStatus: "Resume"})} else {this.setState({recordStatus: "Pause"})}
    if (recordStatus === "Resume") {
      this.mediaRecorder.resume()
>>>>>>> master
    }
    if (recordStatus === "Resume") {
      this.mediaRecorder.resume();
    } else {
      this.mediaRecorder.pause();
    }
  }

  render() {
<<<<<<< HEAD
    console.log(auth.currentUser);
    const { recording } = this.state;
    return (
      <div className="camera">
        <div className={styles.logo}>
          <h1>Jabber</h1>
          {auth.currentUser ? <h3>{auth.currentUser.displayName}</h3> : null}
          <img
            src="https://images.vexels.com/media/users/3/158095/isolated/preview/675d732db5174565de6383cb451b20a6-open-mouth-icon-by-vexels.png"
            alt="lips"
          />
=======
    console.log(auth.currentUser)
    const {recording} = this.state;
        return (
          <div className="camera">
        <div className={styles.logo}>
            <h1>Jabber</h1>
            {auth.currentUser ? (<h3>{auth.currentUser.displayName}</h3>) : null}
            <img src="https://images.vexels.com/media/users/3/158095/isolated/preview/675d732db5174565de6383cb451b20a6-open-mouth-icon-by-vexels.png" alt="lips"/>
>>>>>>> master
        </div>
        <div className={styles.recorder_area}>
          <audio controls src={this.state.blobURL}>
            {" "}
            Video stream not available.{" "}
          </audio>
          {auth.currentUser ? (
            <section className={styles.button_space}>
              {!recording ? (
                <>
                  <button onClick={e => this.startUpMedia(e)}>Record</button>
                  <button id={styles.invisible_button} />
                </>
              ) : (
                <>
                  <button onClick={e => this.stopRecording(e)}>Submit</button>
                  <button onClick={() => this.pause()}>
                    {this.state.recordStatus}
                  </button>
                </>
<<<<<<< HEAD
              )}
            </section>
          ) : (
            <div>
              <h2>Please login to record your own jabs </h2>
              <Link to="/">
                <h3>Here:</h3>
              </Link>
            </div>
          )}
        </div>
        {recording ? <h3>Recording...</h3> : null}
        <LoadJabs />
=======
                }
            </section>
            : <div><h2>Please login to record your own jabs </h2><Link to="/"><h3>Here:</h3></Link></div>}
        </div>
            {recording ? (<h3>Recording...</h3>) : null}
        <LoadJabs/>
>>>>>>> master
      </div>
    );
  }
}
