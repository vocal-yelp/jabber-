import React, { Component } from "react";
import styles from "./JabberMainPage.module.scss";
import firebase from "../firebase/index";
import { Link } from "react-router-dom";
import axios from "axios";

const storage = firebase.storage();
const auth = firebase.auth();

export default class JabberMainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recording: false,
      recordStatus: "Pause",
      blob: "",
      blobURL: ""
    };
  }
  // componentDidMount() {
  //   const folderReturn = storage.ref(
  //     "audio/Adam Mckenzie: fzQyFSyWg7Nh7VokTioTp1gBO502/Wed May 29 2019 16:24:46 GMT-0500 (Central Daylight Time)"
  //   );
  //   // .child("Adam Mckenzie: fzQyFSyWg7Nh7VokTioTp1gBO502");
  //   console.log("folder log", folderReturn);
  //   const child = folderReturn.child(
  //     "Wed May 29 2019 16:24:46 GMT-0500 (Central Daylight Time)"
  //   );
  //   console.log(child);
  //   folderReturn.getDownloadURL().then(res => {
  //     console.log(res);
  //   });
  // }

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
  async saveAudio() {
    const uid = firebase.auth().currentUser.uid;
    const name = firebase.auth().currentUser.displayName;
    const date = new Date().toString().substr(0, 21);
    console.log(date);
    const blob = await new Blob(this.chunks, { type: "audio/webm" });
    console.log(blob);
    this.setState({ blob });
    const uploadBlob = storage
      .ref("audio/")
      .child(`${name}: ${uid}/${date}`)
      .put(this.state.blob);
    // const storageDate = storage.ref(`audio/${name}: ${uid}/`).child
    const folderReturn = storage.ref(
      "audio/Adam Mckenzie: fzQyFSyWg7Nh7VokTioTp1gBO502/Wed May 29 2019 22:14:03 GMT-0500 (Central Daylight Time)"
    );
    folderReturn.getDownloadURL().then(res => this.setState({ URL: res }));
    uploadBlob.on(
      "state_changed",
      () => null,
      error => {
        console.log(error);
      },
      () => {
        axios
          .post("/api/sendBlob", {
            name,
            uid,
            URL: this.state.URL
          })
          .then(response => console.log(response));
      }
    );
  }

  pause() {
    const { recordStatus } = this.state;
    if (recordStatus === "Pause") {
      this.setState({ recordStatus: "Resume" });
    } else {
      this.setState({ recordStatus: "Pause" });
    }
    if (recordStatus === "Resume") {
      this.mediaRecorder.resume();
    } else {
      this.mediaRecorder.pause();
    }
  }

  render() {
    const { recording } = this.state;
    return (
      <div className="camera">
        <div className={styles.logo}>
          <h1>Jabber</h1>
          {auth.currentUser ? (
            <h3>{auth.currentUser.displayName}</h3>
          ) : (
            <h3> Hello, guest! </h3>
          )}
          <img
            src="https://images.vexels.com/media/users/3/158095/isolated/preview/675d732db5174565de6383cb451b20a6-open-mouth-icon-by-vexels.png"
            alt=""
          />
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
        {recording ? <h3>Recording...</h3> : <h3>Not Recording Yet</h3>}
        <div className={styles.map_box}>
          <img
            src="https://www.kulud-pharmacy.com/wp-content/uploads/2018/01/687474703a2f2f692e696d6775722e636f6d2f4f32454f4378662e706e67.png"
            alt=""
          />
        </div>
      </div>
    );
  }
}
