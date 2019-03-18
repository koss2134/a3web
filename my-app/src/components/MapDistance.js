import React from "react";
import './EditPhotoDetails.css';
import { Link } from 'react-router-dom';

//Component that uses calgaries location and determines how far you are from the picture.
class MapDistance extends React.Component {
	
	constructor(props){
		super(props);
		this.state = { lat: 0, lng: 0, dist: 0};
	}
	
	
	//Helped in creation using geolocation api and https://www.movable-type.co.uk/scripts/latlong.html
	//This compares to locations to get the photo distance.
	getCords = () => {
		//This was done manually due to errors sometimes happening with gio locaiton.
		var lat1 = 51.0486;
		var lng1 = -114.0708;
		var R = 6371; // metres
		var φ1 = lat1 * (Math.PI / 180);
		var φ2 = this.props.lat * (Math.PI / 180);
		var one = this.props.lat-lat1;
		var two = this.props.lng-lng1;
		var Δφ = one * (Math.PI / 180);
		var Δλ = two * (Math.PI / 180);

		var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		var dist = Math.round(d) + " km";
		return (dist);
	}
	
	//Renders a blerb about distance from pic by calling the fucntion created above.
	render() {
		return (
			<div>
			
				<p>You are {this.getCords()} from the location this photo was taken.</p>
			</div>
		);
	}
}
export default MapDistance;