import React, { Component } from "react";
import styles from "./JabberMainPage.module.scss";
import firebase from "../firebase/index";
import mouth from "../Pics/mouth.png";
import record from "../Pics/recordButton.png";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { ReactMic } from "react-mic";
import "react-toastify/dist/ReactToastify.css";
import AppNavigation from "../AppNavigation/AppNavigation";
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
      blobURL: "",
      URL: "",
      user: false,
      lat: "",
      lng: ""
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: true });
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

  async startUpMedia(e) {
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

  notify = () => toast("Posted to map");

  stopRecording(e) {
    e.preventDefault();
    this.mediaRecorder.stop();
    this.setState({ recording: false });
    this.saveAudio();
    this.notify();
  }

  async saveAudio() {
    const uid = firebase.auth().currentUser.uid;
    const name = firebase.auth().currentUser.displayName;
    const img = firebase.auth().currentUser.photoURL;
    const date = new Date().toString().substr(0, 24);
    const blob = await new Blob(this.chunks, { type: "audio/webm" });
    const blobURL = window.URL.createObjectURL(blob);
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
          URL: res,
          lat: this.state.lat,
          lng: this.state.lng,
          img
        })
        .then(response => console.log(response))
        .catch(err => console.log(err));
    });
  }

  render() {
    console.log(this.state.lat, this.state.lng);
    const { recording } = this.state;
    return (
      <div className="camera">
        <AppNavigation />
        <ToastContainer
          transition={Zoom}
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        {!auth.currentUser ? <Redirect to="/" /> : null}
        <section className={styles.main_page_top}>
          <div className={styles.logo}>
            {/* <img src={jabber} /> */}
            <h1>Record</h1>
          </div>
          <div className={styles.recorder_area}>
            <audio controls src={this.state.blobURL} />
            <ReactMic
              record={this.state.recording}
              className={styles.sound_wave}
              onStop={this.state.stopRecording}
              onData={this.onData}
              strokeColor="white"
              backgroundColor="#37bcde"
            />
            {auth.currentUser ? (
              <section className={styles.button_space}>
                <div className={styles.mic_button}>
                  {!recording ? (
                    <img
                      onClick={e => this.startUpMedia(e)}
                      className={styles.recordBtn}
                      src={record}
                    />
                  ) : (
                    <img
                      onClick={e => this.stopRecording(e)}
                      className={styles.recordBtn}
                      src="https://www.freeiconspng.com/uploads/music-round-sound-stop-stop-button-technology-icon-15.png"
                    />
                  )}
                </div>
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
        </section>
        <section className={styles.main_page_bottom}>
          <div className={styles.mic_button}>
            <Link to="/MapContainer">
              <img className={styles.mapBtn} src={mouth} />
            </Link>
          </div>
        </section>
      </div>
    );
  }
}
