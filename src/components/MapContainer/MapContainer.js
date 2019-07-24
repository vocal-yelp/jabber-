import React, { Component } from "react";
import firebase from "../firebase/index";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { Link } from "react-router-dom";
import record from "../Pics/recordButton.png";
import styles from "./MapContainer.module.scss";
import AppNavigation from "../AppNavigation/AppNavigation";
import mouth from "../Pics/mouth.png";
import icon from "../Pics/logo.png";

import axios from "axios";

const mapStyles = {
  width: "100%",
  height: "60vh"
};

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markerClips: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      lat: "",
      lng: ""
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: true });
    });
    axios.get("/api/loadJabs").then(res => {
      console.log(res.data);
      this.setState({ markerClips: res.data });
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

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  displayMarkers = () => {
    return this.state.markerClips.map((clip, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{ lat: clip.lat, lng: clip.lng }}
          onClick={this.onMarkerClick}
          audio={clip.URL}
          name={clip.name}
          img={clip.img}
          date={clip.date.substr(0, 21)}
          icon={{
            url: mouth,
            anchor: new window.google.maps.Point(32, 32),
            scaledSize: new window.google.maps.Size(48, 48)
          }}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <AppNavigation />
        <div className={styles.div2}>
          <img className={styles.logo} src={icon} />
          <h1 className={styles.title}> EXPLORE JABS </h1>
        </div>
        <Map
          className={styles.map}
          google={this.props.google}
          style={mapStyles}
          center={{ lat: this.state.lat, lng: this.state.lng }}
          initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
          zoom={16}
          onClick={this.onMapClicked}
        >
          {this.displayMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            // onOpen={this.windowHasOpened}
          >
            <div className={styles.info_window}>
              <img src={this.state.selectedPlace.img} />
              <h1>{this.state.selectedPlace.name}</h1>
              <h3 className={styles.date}>{this.state.selectedPlace.date}</h3>
              <audio controls src={this.state.selectedPlace.audio} />
            </div>
          </InfoWindow>
        </Map>
        <section className={styles.profile_page_bottom}>
          <div className={styles.mic_button}>
            <Link to="/JabberMainPage">
              <img className={styles.recordBtn} src={record} />
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyABEAUmzjPGzPgYlDc7lXwHMZf-_7J4VHg"
})(MapContainer);
