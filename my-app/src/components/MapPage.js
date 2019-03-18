import React from "react";
import { Link, Route } from 'react-router-dom';
import Map from './Map.js';
import MapDistance from './MapDistance.js';
//import { Route } from 'react-router-dom';

class MapPage extends React.Component {
	//Renders a single route for /map and then individual routes /map/id for each photo for linking from other portions of the app to ensure that it reloads the map correctly.
	
	render() {
		const id = this.props.currentPhoto;
		if (this.props.photos.length > 0) {
		const photo = this.props.photos.find( p => p.id === id);
		return (
			<div>
				<Route path='/browse/map' exact render={ (props) =>
					<div>					
							<article className="details">
							<div className="detailsPhotoBox">
							<legend>Map of Photo Location</legend>
							<label><h1>{photo.title}</h1></label>
							<label>Location: {photo.city}, {photo.country}</label>
							<MapDistance lat={photo.latitude} lng={photo.longitude}> </MapDistance>
							<Link to='/browse/edit'><button>Edit</button></Link><Link to='/browse'><button>View</button></Link>
							<Map lat={photo.latitude} lng={photo.longitude} photo={photo} currentPhoto={this.props.currentPhoto} ></Map>
							</div>
							</article>							
					</div>}
				/>
				{this.props.photos.map((p) => {
					return(
					<Route path={"/browse/map/"+p.id} key={p.id} exact render={ (props) =>
						<div>					
								<article className="details">
								<div className="detailsPhotoBox">
								<legend>Map of Photo Location</legend><br/>
								<label><h1>{photo.title}</h1></label>
								<label>Location: {photo.city}, {photo.country}</label>
								<MapDistance lat={photo.latitude} lng={photo.longitude} > </MapDistance>
								<Link to='/browse/edit'><button>Edit</button></Link><Link to='/browse'><button>View</button></Link>
								<Map lat={photo.latitude} lng={photo.longitude} photo={photo} currentPhoto={this.props.currentPhoto} ></Map>
								</div>
								</article>							
						</div>}
					/>);
				})}
			</div>
		);
		}
		else{
			return null;
		}
	}
}
export default MapPage;