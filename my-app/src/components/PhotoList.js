import React from "react";
import PhotoThumb from './PhotoThumb.js';

//This create a list of photo thumbs using the .map function.
class PhotoList extends React.Component {
	render() {
		if (this.props.photos.length > 1) {
			return (
			<div className="photoList">
				<div className="sortDiv">
				<h3 className="sortH">Sort By: <button onClick={this.citySort}>City</button><button onClick={this.countrySort}>Country</button> </h3>
				</div>
				<article className="photos">
				{ this.props.photos.map( (p) => <PhotoThumb photo={p} key={p.id} showImageDetails={this.props.showImageDetails} addFavorite={this.props.addFavorite} deletePhoto={this.props.deletePhoto} /> )}
				</article>
			</div>
			);
		}
		else {
			return null;
		}
	}
	
	citySort = ()=> {
		this.props.photoCitySort();
	}
	
	countrySort = ()=> {
		this.props.photoCountrySort();
	}
}
export default PhotoList;