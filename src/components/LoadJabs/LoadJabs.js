import React, { Component } from "react";
import axios from "axios";
import firebase from "../firebase/index";

const auth = firebase.auth();

export default class LoadJabs extends Component {
  constructor() {
    super();

    this.state = {
      URL: []
    };
  }
  componentDidMount() {
    axios.get("/api/loadJabs").then(res => {
      console.log(res.data);
      this.setState({ URL: res.data });
    });
  }

  // deleteJab = (date) => {
  //     axios.delete(`/api/deleteJab/${date}: ${auth.currentUser.uid}`).then(res => {
  //         console.log(res)
  //     })
  // }

  render() {
    const clips = this.state.URL.map((clip, index) => {
      return (
        <div key={index}>
          <h3>{clip.name}</h3>
          <audio controls src={clip.URL} />
          <h6>{clip.date}</h6>
        </div>
      );
    });
    return <div>{clips}</div>;
  }
}
