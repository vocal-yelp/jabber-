import React, { Component } from "react";
import styles from "./JabberMainPage.module.scss";
import firebase from "../firebase/index";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadJabs from "../LoadJabs/LoadJabs";
import recordButton from "./../Pics/recordButton.png";
import MapContainer from '../MapContainer/MapContainer';

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
      URL: "",
      user: false,
      lat: "",
      lng: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user: true})
      console.log("user", user);
    });
    navigator.geolocation.getCurrentPosition(
      function(position) {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        console.log(this.state.lat, this.state.lng);
      }.bind(this)
    );
  }

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
    const date = new Date().toString().substr(0, 24);
    console.log(date);
    const blob = await new Blob(this.chunks, { type: "audio/webm" });
    const blobURL = window.URL.createObjectURL(blob)
    console.log(blob);
    this.setState({ blob, blobURL });
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
    }
    if (recordStatus === "Resume") {
      this.mediaRecorder.resume();
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
          {auth.currentUser ? (<h3>{auth.currentUser.displayName}</h3>) : null}
        </div>
        <div className={styles.map_box}>
          <MapContainer lat={this.state.lat} lng={this.state.lng} />
        </div>
        <div className={styles.recorder_area}>
          <audio controls src={this.state.blobURL}/>
          {auth.currentUser ? (
            <section className={styles.button_space}>
              {!recording ? (
                <>
                <img onClick={e => this.startUpMedia(e)} className={styles.recordBtn} src={recordButton} />
                </>
              ) : (
                <>
                <button onClick={e => this.stopRecording(e)}>Submit</button>
                <button onClick={() => this.pause()}>{this.state.recordStatus}</button>
                </>
              )}
          </section>
          ) : (
            <div>
              <h2>Please login to record your own jabs </h2>
              <Link to="/">
                <h3>- Login -</h3>
              </Link>
            </div>
          )}
        </div>
        {recording ? <h3>Recording...</h3> : null}
        <LoadJabs />
      </div>
    );
  }
}
