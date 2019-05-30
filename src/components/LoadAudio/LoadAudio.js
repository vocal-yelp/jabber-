import React, { Component } from "react";
import firebase from "../firebase/index";
import Axios from "axios";

const auth = firebase.auth();

export default class LoadAudio extends Component {
  constructor() {
    super();

    this.state = {
      URL: []
    };
  }
  componentDidMount() {
    Axios.get("/api/loadAudio").then(res => {
      console.log(res);
      this.setState({
        URL: res.data
      });
    });
  }

  deleteJab = date => {
    Axios.delete(`/api/deleteJab/${date}: ${auth.currentUser.uid}`).then(
      response => {
        console.log(response);
      }
    );
  };

  render() {
    const clips = this.state.URL.map((clip, index) => {
      return (
        <div key={index}>
          {" "}
          <h3>{clip.name}</h3>
          <audio controls src={clip.URL} />
          <button onClick={() => this.deleteJab(clip.date)}>X</button>
        </div>
      );
    });
    return <div>{clips}</div>;
  }
}
