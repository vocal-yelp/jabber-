import React, {Component} from 'react';
import firebase from '../firebase/index';
import styles from './Map.module.scss';
import google from 'google-maps-react';
import './Map.css';

const auth = firebase.auth();

export default class Map extends Component {
    constructor(){
        super()

        this.state = {
            
        }
    }

componentDidMount() {
    console.log("hey")
    var map, infoWindow;
    function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;
    console.log(infoWindow)
    console.log(map)

  // Try HTML5 geolocation.
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
      };
      console.log(pos)

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}}
 

    render(){
        return(
            <div id="map">
            <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyABEAUmzjPGzPgYlDc7lXwHMZf-_7J4VHg&callback=initMap">
            </script>
            </div>
        )
    }
}