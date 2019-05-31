<<<<<<< HEAD
import React, { Component } from "react";
import axios from "axios";
import firebase from "../firebase/index";
import styles from "./LoadUserJabs.module.scss";
=======
import React, {Component} from 'react';
import axios from "axios";
import firebase from '../firebase/index'
import styles from './LoadUserJabs.module.scss'
>>>>>>> master

const auth = firebase.auth();

export default class LoadUserJabs extends Component {
<<<<<<< HEAD
  constructor() {
    super();

    this.state = {
      URL: []
    };
  }
  componentDidMount() {
    axios.get(`/api/loadUserJabs/${auth.currentUser.uid}`).then(res => {
      console.log(res.data);
      this.setState({ URL: res.data });
    });
  }

  deleteJab = date => {
    axios
      .delete(`/api/deleteJab/${date}: ${auth.currentUser.uid}`)
      .then(res => {
        console.log(res);
      });
  };

  render() {
    const clips = this.state.URL.map((clip, index) => {
      return (
        <div key={index}>
          <div className={styles.user_clips}>
            <audio controls src={clip.URL} />
            <button onClick={() => this.deleteJab(clip.date)}>X</button>
          </div>
          <h6>{clip.date}</h6>
        </div>
      );
    });
    return <div>{clips}</div>;
  }
}
=======
    constructor(){
        super()

        this.state = {
            URL: []
        }
    }
    componentDidMount(){
        axios.get(`/api/loadUserJabs/${auth.currentUser.uid}`).then( res => {
            console.log(res.data)
           this.setState({URL: res.data})
        })
    }

    deleteJab = (date) => {
        axios.delete(`/api/deleteJab/${date}: ${auth.currentUser.uid}`).then(res => {
            console.log(res)
        })
    }

    render(){
        const clips = this.state.URL.map((clip, index) => {
            return (<div key={index}>
                <div className={styles.user_clips} >
                <audio controls src={clip.URL}/>
                <button onClick={() => this.deleteJab(clip.date)}>X</button>
                </div>
                <h6>{clip.date}</h6>
                </div>)
        })
        return(
            <div>
                {clips}
            </div>
        )
    }
}
>>>>>>> master
