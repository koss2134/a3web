import React from "react";
import { Link } from 'react-router-dom';

//Includes Route links as well as actions to handle clicks on buttons.
class PhotoThumb extends React.Component {
  render() {
	 const imgURL = `https://storage.googleapis.com/funwebdev-3rd-travel/medium/${this.props.photo.path}`;
	 return (
	 <div className="photoBox">
		<figure onClick={this.handleViewClick} >
			<Link to='/browse'><img src={imgURL} className="photoThumb" title={this.props.photo.title} alt={this.props.photo.title} /></Link>
		</figure>
		<div>
		<div className="photoButtonDiv">
		<button className="photoDelete" onClick={this.handleDeleteClick}>X</button>
		</div>
		<h3>{this.props.photo.title}</h3>
		<p>{this.props.photo.city}, {this.props.photo.country}</p>
		<Link to='/browse'><button onClick={this.handleViewClick} >View</button></Link><button onClick={this.handleFavoriteClick} >❤</button>
		<Link to={`/browse/map/${this.props.photo.id}`}><button onClick={this.handleViewClick}>Map</button></Link><Link to='/browse/edit'><button onClick={this.handleViewClick}>Edit</button></Link>
		</div>
	 </div>
	 );
  }
	//handles to call parrent functions to update state in App.
	handleFavoriteClick = () => {
		this.props.addFavorite(this.props.photo);
	}
  
	handleViewClick = () => {
		this.props.showImageDetails(this.props.photo.id);
	}
	
	handleDeleteClick = () => {
		this.props.deletePhoto(this.props.photo.id);
	}
}
export default PhotoThumb;