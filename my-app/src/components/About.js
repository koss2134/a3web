import React from "react";
import './Home.css';
import { Link } from 'react-router-dom';
class About extends React.Component {
	
//This page tells about the project and what was used to help in its creation.
 render() {
	 return (
		 <div className="banner">
			 <div className="aboutPage">
			 <h1>About Page</h1><br/>
			 <h3>Web3 Assignment 1 by James Stewart a web3 student!</h3><br/>
			 <h4>Built using React with help from: </h4>
			 <p>
			 RANDY, and his LABs!<br/><br/>
			 <a href="https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript">Stack Overflow </a>
			 for calculation for comparing two distances.<br/><br/>
			 <a href="https://davidwalsh.name/javascript-zip">David Walsh </a>
			 for code instruction related to ziping files (still work in progress).<br/><br/>
			 GeoLocate API for instruction in its use.<br/><br/>
			 <a href="https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react">Rachael Njeri </a>
			 for help with setting up a google-maps-react.<br/><br/>
			 And Finally w3schools.com for css help.</p><br/><br/>
			 <h4>Built Using These Packages/Modules:</h4>
			 <p>react-router-dom, lodash, google-maps-react, and jszip. </p>
			 <p>
			 <Link to='/browse'>
			 <button>Browse</button>
			 </Link>
			 <Link to='/home'>
			 <button>Home</button>
			 </Link>
			 </p>
			 </div>
		 </div>
	 );
 }
}
export default About