import React, { Component } from 'react';
import HeaderApp from './components/HeaderApp.js';
import Home from './components/Home.js';
import About from './components/About.js';
import PhotoThumb from './components/PhotoThumb.js';
import PhotoBrowser from './components/PhotoBrowser.js';
import Favorites from './components/Favorites.js';
import * as cloneDeep from '../node_modules/lodash/cloneDeep';
import { Route } from 'react-router-dom';
import './components/EditPhotoDetails.css';

class App extends Component {
	
	//Basic constructor setting state to null.
	constructor(props) {
		super(props);
		this.state = { photos: [], favorites: []};
	}
	
	//This will assing localStorage to the state before the render.
	componentWillMount(){
		localStorage.getItem('Favorites') && this.setState({
			favorites: JSON.parse(localStorage.getItem('Favorites'))
		})
		localStorage.getItem('Pictures') && this.setState({
			photos: JSON.parse(localStorage.getItem('Pictures'))
		})
	}
	
	//Fetches data for the intial load.
	componentDidMount() {
		const url = "http://randyconnolly.com/funwebdev/services/travel/images.php";
		//Checks to make sure localStorage is empty, otherwise it would overwrite because of the life cycle order of operations.
		if(localStorage.getItem('Pictures') == null) {
			fetch(url)
				.then ( reposnse => reposnse.json())
				.then ((data) => {
					localStorage.setItem('Pictures', JSON.stringify(data));
					this.setState( {photos: data} );
				})
				.catch (error => console.log(error));
		}
	}
	
	//This updates the localStorage any time a change in State occurs. Supper helpful lifecycle function
	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('Favorites', JSON.stringify(nextState.favorites));
		localStorage.setItem('Pictures', JSON.stringify(nextState.photos));
	}
 
	//Function to update the photo's info.
	updatePhoto = (id, photo) => {
		const copyPhotos = cloneDeep(this.state.photos);
		const photoToReplace = copyPhotos.find( p => p.id === id);
		photoToReplace.title = photo.title;
		photoToReplace.city = photo.city;
		photoToReplace.description = photo.description;
		photoToReplace.country = photo.country;
		//Checking to make sure that you are imputing a correct latitude.
		if((photo.latitude >= 0 && photo.latitude <= 90) || (photo.latitude < 0 && photo.latitude >= -90)){
		photoToReplace.latitude = photo.latitude;
		}
		//Checking to make sure you are entering a correct longitude
		if((photo.longitude >= 0 && photo.longitude <= 180 )|| (photo.longitude < 0 && photo.longitude >= -180)){
		photoToReplace.longitude = photo.longitude;
		}
		this.setState({photos: copyPhotos } );
	}
	
	//Add a photo to favorites state.
	addFavorite = (photo) => {
		const copyFavorites = cloneDeep(this.state.favorites);
		if(!copyFavorites.find( (p)=> p.id === photo.id)){
			copyFavorites.push(photo);
			this.setState({favorites: copyFavorites} );
		}
	}
	
	//All Deletes are handled with IDs to prevent certain erros with duplicates, or mistake duplicate deletes.
	
	//Deletes a Favorite Photo.
	deleteFavorite = (id) => {
		const copyFavorites = cloneDeep(this.state.favorites);
		const photoToDelete = copyFavorites.find( (p)=> p.id === id);
		const newFavorites = copyFavorites.filter((p)=> p !== photoToDelete);
		this.setState({favorites: newFavorites} );
	}
	
	//Deletes a photo from both the photos and favorites.
	deletePhoto = (id) => {
		this.deleteFavorite(id);
		const copyPhotos = cloneDeep(this.state.photos);
		const photoToDelete = copyPhotos.find( p => p.id === id);
		const newPhotos = copyPhotos.filter((p)=> p !== photoToDelete);
		this.setState({photos: newPhotos} );
	}
	
	//Sorting Functions
	photoCitySort = () => {
		const copyPhotos = cloneDeep(this.state.photos);
		const sortedPhotos = copyPhotos.sort( (a,b)=> {
			return a.city < b.city ? -1 : 1;
		});
		this.setState({photos: sortedPhotos} );
	}
	photoCountrySort = () => {
		const copyPhotos = cloneDeep(this.state.photos);
		const sortedPhotos = copyPhotos.sort( (a,b)=> {
			return a.country < b.country ? -1 : 1;
		});
		this.setState({photos: sortedPhotos} );
	}
	
	//Main render that has the Router functions addded in. Browse has nested routes
	render() {
		return (
			<div>
				<HeaderApp />
				<Route path='/' exact component={Home} />
				<Route path='/home' exact component={Home} />
				<Route path='/about' exact component={About} />
				<Route path='/browse'
				render={ (props) =>
				<div>
					<Favorites favorites={this.state.favorites} deleteFavorite={this.deleteFavorite} />
					
					<PhotoBrowser photos={this.state.photos} updatePhoto={this.updatePhoto} addFavorite={this.addFavorite} deletePhoto={this.deletePhoto} updateLeePhoto={this.updateLeePhoto} photoCitySort={this.photoCitySort} photoCountrySort={this.photoCountrySort} /> 
				</div>}
				/>
			</div>
		);
	}
}

export default App;
