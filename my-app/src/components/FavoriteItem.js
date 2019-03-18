import React from "react";

class FavoriteItem extends React.Component {
	
	//handler to call parrent function to update state of favorites in App.
	handleDelete = ()=> {
		this.props.deleteFavorite(this.props.photo.id);
	}
  
  //Simple render for each facorite thumbnail and its delete button.
  render() {
	 const imgURL = `https://storage.googleapis.com/funwebdev-3rd-travel/medium/${this.props.photo.path}`;
	 return (
		<div className="favDiv">
			<img src={imgURL} className="photoThumb" title={this.props.photo.title} alt={this.props.photo.title} />
			<div className="bDiv">
				<button className="favoriteDelete" onClick={this.handleDelete}>X</button>
			</div>
		</div>
		)
  }
  

}
export default FavoriteItem;