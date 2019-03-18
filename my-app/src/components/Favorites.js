import React from "react";
import FavoriteItem from './FavoriteItem.js';
//import JSZip from "jszip";
//import RNFS from 'rn-fetch-blob';


class Favorites extends React.Component {
	
	//Created with the help of https://davidwalsh.name/javascript-zip
	//CURRENTLY NOT WORKING FOR SOME REASON JSZip DOES NOT WANT TO USE saveAs, and IMPORTING THE RNFS has cause erors on React start?!?!? Spent nearly 8hrs on this alone, not putting any more into it. I have given up on it. Sorry.
	downloadFavorites = () => {
		/*var zip = new JSZip();
		zip.file("Hello.txt", "Image Folder of Favorite Images\n");
		var img = zip.folder("images");
		this.props.favorites.forEach((p)=>{}) //delete }) after removing comments
		*/
			/*
			//This is to apply the image to base64 however I am getting an error in the package on import?
			const path = `https://storage.googleapis.com/funwebdev-3rd-travel/large/${p.path}`;
			RNFS.readFile(path, 'base64')
			.then(res =>{
				img.file(p.path, dataFromUrl, {base64: true});
			});
			
		})
		//saveAs is not a function apparently? even putting JSZip.saveAs doesn't work.
		zip.generateAsync({type: "blob"}).then((content)=>{
				saveAs(content, "favorites.zip");
			});*/
		
	}
	
	
	//Some minor help with this transformation from http://jsfiddle.net/9ccjE/ However mostly a starting point and not much else.
	//This function set the div to show or not and changes the buttons name when clicked.
	showDiv = () => {
		var growDiv = document.querySelector('.grow');
		if(growDiv.style.display == 'inline') {
			growDiv.style.display = 'none';
		}
		else {
			var wrapper = document.querySelector('.favorites');
			growDiv.style.display = 'inline';
		}
		document.querySelector('.shbutton').value=document.querySelector('.shbutton').value=='Hide Favorites'?'Show Favorites':'Hide Favorites';
	}
	
	//For some reason setting inline in the css was not working so need to set manually through the elements here after the component mounts.
	componentDidMount() {
		var gDiv = document.querySelector('.grow');
		gDiv.style.display = 'inline';
	}
	
	
	render() {
		if (this.props.favorites.length > 0) {
			return (
			<div>
				<input type="button" className="shbutton" onClick={this.showDiv} value="Hide Favorites"/>
				<div className="grow">
				<div className="favorites">
				<p className="favoriteTitle">Favorites ❤</p>
				{this.props.favorites.map( (p) => <FavoriteItem photo={p} key={p.id} addFavorite={this.props.addFavorite} deleteFavorite={this.props.deleteFavorite} /> )}
				<button className='downloadFavorites' onClick={this.downloadFavorites}>Download All Favorites</button>
				</div>
				</div>
			</div>
			);
		}
		else {
			return null;
		}
	}
}
export default Favorites;