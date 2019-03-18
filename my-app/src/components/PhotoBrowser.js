import React from "react";
import PhotoList from './PhotoList.js';
import EditPhotoDetails from './EditPhotoDetails.js';
import PhotoDetails from './PhotoDetails.js';
import MapPage from './MapPage.js';
import { Route } from 'react-router-dom';
import './EditPhotoDetails.css';

//This is the main veiw for the project and contains all other routes not in App.
class PhotoBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currentPhoto: 1 };
	}
	
	//This is required to get around the fact that one may delete the first photo with ID 1. It assigns CurrentPhoto from localstorage to state.
	componentWillMount(){
		localStorage.getItem('CurrentPhoto') && this.setState({
			currentPhoto: JSON.parse(localStorage.getItem('CurrentPhoto'))
		})
	}
	
	//Catched Updates of currentPhoto and asigned it to LocalStorage.
	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('CurrentPhoto', JSON.stringify(nextState.currentPhoto));
	}
	
	//Function for passing the ability to update currentPhoto to child components
	showImageDetails = (id) => {
		this.setState({ currentPhoto: id });
	}
	
	//This is to handles the fact that you may be viewing a photo you are deleting. As with all deletes it uses ID not index or photo array. This is almost important 
	handleImageDelete = (id) => {
		var pIndex = 0;
		var photo = this.props.photos.find(p => p.id === id);
		pIndex = this.props.photos.indexOf(photo);
		//Handles the rare ocasion where someone would delete all the travell photos.
		if (this.props.photos.length <= 1){
			console.log("Preventing Photo Delete. Must have at least one photo in list.");
		}
		//This allows deleteing of the first pic, w/ ID=1, without issues, while viewing or when sorted.
		else if (pIndex === 0){
			this.showImageDetails(this.props.photos[1].id);
		}
		//To handle most normal delete of photos you are not veiwing.
		else if (id != this.state.currentPhoto){
			//do nothing
		}
		//How the rest of photos are handled when you are veiwing them and deleting.
		else {
			var newIndex = pIndex - 1;
			this.showImageDetails(this.props.photos[newIndex].id)
		}
		//Finally deleting the photo.
		this.props.deletePhoto(id);
	}
		
	//Route for the three veiws in PhotoBrowser as nested below.
	render() {
		
		return (
			<section className="container">
			<PhotoList photos={this.props.photos} showImageDetails={this.showImageDetails} addFavorite={this.props.addFavorite} deletePhoto={this.handleImageDelete} photoCitySort={this.props.photoCitySort} photoCountrySort={this.props.photoCountrySort} />
			<Route path='/browse' exact
			render={ (props) =>
				<PhotoDetails photos={this.props.photos} currentPhoto={this.state.currentPhoto} showImageDetails={this.showImageDetails} updatePhoto={this.props.updatePhoto} />
			}/>
			<Route path='/browse/edit'
			render={ (props) =>
				<EditPhotoDetails photos={this.props.photos} currentPhoto={this.state.currentPhoto} showImageDetails={this.showImageDetails} updatePhoto={this.props.updatePhoto} />
			}/>
			<Route path='/browse/map'
			render={(props) =>
				<MapPage photos={this.props.photos} currentPhoto={this.state.currentPhoto} />
			}/>
			</section>
		);
	}
}
export default PhotoBrowser;