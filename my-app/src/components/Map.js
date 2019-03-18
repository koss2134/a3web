import React, { Component } from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';


//Assigns the boundries of the map
const mapStyles = {
  width: '810px',
  height: '600px'
};

//This was built with the help of the wonderful guide over @ https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
export class MapContainer extends Component {
	
	//Setting up intial state.
	state = {
		showingInfoWindow: false, 
		activeMarker: {},        
		selectedPlace: {},         
		title: "Not Loaded",
		currentID: 1,
		lat: 0,
		lng: 0
	};
	
	//Handler to show the info portion on the marker being clicked.
	onMarkerClick = (props, marker, e) =>
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
    });

	//handles closing the info window when the close is clicked.
	onClose = props => {
		if (this.state.showingInfoWindow) {
			this.setState({
			showingInfoWindow: false,
			activeMarker: null
			});
		}
	};
	
	//This assigns the title of the photo to the marker info before render.
	componentWillMount(){
		if (this.props.photo){
			this.setState({title: this.props.photo.title, lat: this.props.lat, lng: this.props.lng})
		}
		if (this.state.currentID != this.props.currentPhoto) {
			this.setState({currentID: this.props.currentPhoto});
			this.setState({title: this.props.photo.title, lat: this.props.lat, lng: this.props.lng});
		}
	}

	
  render() {
    return (
	<div style={{ width: '840px', height: '600px'}}>
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={this.state.title}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
	</div>
    );
  }
}

//This wraps the key up nicely for the map creation, as well as adds the Google Map abilities.
export default GoogleApiWrapper({
  apiKey: 'blank'
})(MapContainer);