import React from "react";
import { Link } from 'react-router-dom';


class EditPhotoDetails extends React.Component {

//This handle change when someone tries to edit a feild. LAT/LNG filtering handled in APP.
handleChange = e => {
	const id = this.props.currentPhoto;
	const photo = this.props.photos.find( p => p.id === id);
	
	const clonedPhoto = {...photo};
	
	clonedPhoto[e.currentTarget.name] = e.currentTarget.value;
	this.props.updatePhoto(this.props.currentPhoto, clonedPhoto);
}


//This was mostly borrowed from lab2 and then modified for this website.
render() {
	const id = this.props.currentPhoto;
	const imgURL = `https://storage.googleapis.com/funwebdev-3rd-travel/medium/`;
	if (this.props.photos.length > 0) {
	const photo = this.props.photos.find( p => p.id === id);
	return (
		<article className="details">
		<div className="detailsPhotoBox">
		<form className="photoForm">
		<legend>Edit Photo Details</legend>
		<img src={imgURL+photo.path} alt={photo.title} />
		<label>Title</label>
		<input type='text' name='title' value={photo.title} onChange={this.handleChange} />
		<label>Description</label>
		<input type='text' name='description' value={photo.description} onChange={this.handleChange} />
		<label>City</label>
		<input type='text' name='city' value={photo.city} onChange={this.handleChange} />
		<label>Country</label>
		<input type='text' name='country' value={photo.country} onChange={this.handleChange}/>
		<label>Latitude</label>
		<input type='text' name='latitude' value={photo.latitude} onChange={this.handleChange}/>
		<label>Longitude</label>
		<input type='text' name='longitude' value={photo.longitude} onChange={this.handleChange}/>
		</form>
		<Link to='/browse/map'><button>Map</button></Link><Link to='/browse'><button>Veiw</button></Link>
		</div>
		</article>
	);
	}
	else {
		return null;
	}
}
}
export default EditPhotoDetails;