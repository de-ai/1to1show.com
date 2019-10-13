
import React from 'react';
import './BottomNav.css';

import { GITHUB_XD_PLUGIN, NPM_DE_PLAYGROUND } from '../../../consts/uris';


function BottomNav(props) {
	const handleClick = (event, url)=> {
		event.preventDefault();
		window.open(url);
	};

	return (
		<div className="bottom-nav">
			<div className="bottom-nav-button-wrapper">
				<button className="quiet-button adjacent-button" onClick={(event)=> handleClick(event, NPM_DE_PLAYGROUND)}>NPM Module</button>
				<button className="quiet-button" onClick={(event)=> handleClick(event, GITHUB_XD_PLUGIN)}>Adobe XD Plugin</button>
			</div>
		</div>
	);
}


export default (BottomNav);
