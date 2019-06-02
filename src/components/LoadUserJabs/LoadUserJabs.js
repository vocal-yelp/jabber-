import React, {Component} from 'react';
import axios from "axios";
import firebase from '../firebase/index'
import styles from './LoadUserJabs.module.scss'

const auth = firebase.auth();

export default class LoadUserJabs extends Component {
    constructor(){
        super()
        
        this.state = {
            URL: []
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            axios.get(`/api/loadUserJabs/${auth.currentUser.uid}`).then( res => {
            console.log(res.data)
            this.setState({URL: res.data})
            })
        });
      }

    deleteJab = (date) => {
        axios.delete('/api/deleteJab/', {data: {uid: auth.currentUser.uid, date: date}}).then(res => {
        }).then(res => console.log(res))
        this.getUpdate()
    }

    getUpdate() {
        axios.get(`/api/loadUserJabs/${auth.currentUser.uid}`).then( res => {
            console.log("hit")
            this.setState({URL: res.data})
        })
    }

    render(){
        const clips = this.state.URL.map((clip, index) => {
            return (
                <div key={index}>
                <div className={styles.user_clips} >
                <audio controls src={clip.URL}/>
                <button onClick={() => this.deleteJab(clip.date)}>X</button>
                </div>
                <h6>{clip.date}</h6>
                </div>
                )
        })
        return(
            <div>
                {clips}
            </div>
        )
    }
}