import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import styles from "./MapContainer.module.scss";

const mapStyles = {
  width: "100%",
  height: "35vh"
};

function MapContainer(props) {
  return (
    <div id={styles.map}>
      <Map
        google={props.google}
        style={mapStyles}
        center={{ lat: props.lat, lng: props.lng }}
        zoom={16}
      >
        <Marker
          position={{ lat: props.lat, lng: props.lng }}
          onClick={() => console.log("You clicked me!")}
        />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyABEAUmzjPGzPgYlDc7lXwHMZf-_7J4VHg"
})(MapContainer);