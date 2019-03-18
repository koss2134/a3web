import React from "react";
import { Link } from 'react-router-dom';

class PhotoDetails extends React.Component {

//Mostly comes from my lab with a few modifications.
render() {
	const id = this.props.currentPhoto;
	const imgURL = `https://storage.googleapis.com/funwebdev-3rd-travel/medium/`;
	if (this.props.photos.length > 0) {
	const photo = this.props.photos.find( p => p.id === id);
	return (
		<article className="details">
		<div className="detailsPhotoBox">
		<form className="photoForm">
		<legend>Photo Details</legend>
		<img src={imgURL+photo.path} alt={photo.title} />
		<label><h1>{photo.title}</h1></label>
		<label>{photo.description}</label>
		<label><h2>Location: {photo.city}, {photo.country}</h2></label>
		</form>
		<Link to={"/browse/map/"+id}><button>Map</button></Link><Link to='/browse/edit'><button>Edit</button></Link>
		</div>
		</article>
	);
	}
	else {
		return null;
	}
}
}
export default PhotoDetails;