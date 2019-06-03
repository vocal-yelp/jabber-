import React, { Component } from "react";
import firebase from "../firebase/index";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import styles from "./MapContainer.module.scss";
import jabberPin from "../Pics/jabber-Icon.png";
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
      selectedPlace: {}
    };
  }

  componentDidMount() {
    Axios.get("/api/loadJabs").then(res => {
      console.log(res.data);
      this.setState({ markerClips: res.data });
    });
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
      <Map
        google={this.props.google}
        style={mapStyles}
        center={{ lat: this.props.lat, lng: this.props.lng }}
        zoom={16}
        onClick={this.onMapClicked}
      >
        {this.displayMarkers()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          // onOpen={this.windowHasOpened}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
            <h3 className={styles.date}>{this.state.selectedPlace.date}</h3>
            <audio controls src={this.state.selectedPlace.audio} />
            <img src={this.state.selectedPlace.img} />
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyABEAUmzjPGzPgYlDc7lXwHMZf-_7J4VHg"
})(MapContainer);
