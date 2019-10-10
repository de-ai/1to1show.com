
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
				<button className="quiet-button adjacent-button" onClick={(event)=> handleClick(event, NPM_DE_PLAYGROUND)}>Download NPM</button>
				<button className="quiet-button" onClick={(event)=> handleClick(event, GITHUB_XD_PLUGIN)}>Open in Adobe XD</button>
			</div>
		</div>
	);
}


export default (BottomNav);
