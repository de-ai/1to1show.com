
import React from 'react';
import './TopNav.css';

import PageNavLink from '../../iterables/PageNavLink';
import navLinks from '../../../assets/json/nav-links';


function TopNav(props) {
// 	const { darkTheme } = props;
	return (<div className="top-nav">
		<div className="top-nav-logo-wrapper">
		</div>
		<div className="top-nav-theme-toggle-wrapper">
			{/*<input type="checkbox" checked={darkTheme} value={darkTheme} onChange={props.onToggleTheme} />*/}
		</div>
		<div className="top-nav-link-wrapper">
			{(navLinks.top.map((navLink, i)=> (<PageNavLink
				key={i}
				navLink={navLink}
				onClick={(event)=> null}
			/>)))}
		</div>
	</div>);
}


export default (TopNav);
