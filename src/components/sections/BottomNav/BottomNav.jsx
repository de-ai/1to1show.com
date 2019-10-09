
import React from 'react';
import './BottomNav.css';

import { NavLink } from 'react-router-dom';

import { Pages } from '../../../consts/uris';
import navLinks from '../../../assets/json/nav-links';

function BottomNav(props) {
	return (
		<div className="bottom-nav">
			<div className="bottom-nav-link-wrapper">
				{(navLinks.bottom.map((navLink, i)=> (<a href={navLink.url} target="_blank" rel="noopener noreferrer">{navLink.title}</a>)))}
			</div>
			<div className="bottom-nav-disclaimer">
				<h4>By tapping “Sign in with Github” or “Sign Up”<br />you accept our <NavLink
					to={Pages.TERMS}
					className="footer-nav-disclaimer-link"
				>Terms of Service.</NavLink></h4>
			</div>
		</div>
	);
}


export default (BottomNav);
