import React, { Component } from "react";
import firebase from "../firebase/index";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import styles from "./MapContainer.module.scss";
import jabberPin from "../Pics/jabber-Icon.png";
import AppNavigation from "../AppNavigation/AppNavigation";
import Axios from "axios";

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

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: true });
    });
    Axios.get("/api/loadJabs").then(res => {
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
          date={clip.date}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <AppNavigation />
        <Map
          google={this.props.google}
          style={mapStyles}
          center={{ lat: this.state.lat, lng: this.state.lng }}
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
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyABEAUmzjPGzPgYlDc7lXwHMZf-_7J4VHg"
})(MapContainer);
