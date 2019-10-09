
import axios from 'axios';
import { matchPath } from 'react-router-dom';

import { API_ENDPT_URL } from '../consts/uris';


export function getRouteParams(pathname) {
// 	console.log('_-_-_-_-_', 'getRouteParams()', pathname, '_-_-_-_-_', URIs.firstComponent(pathname));

	const homePage = matchPath(pathname, {
		path : '/'
	});

	const privacyPage = matchPath(pathname, {
		path : '/privacy'
	});

	const termsPage = matchPath(pathname, {
		path : '/terms'
	});

// 	console.log(':::::::::::::', loginPage, profilePage, uploadPage, registerPage, inspectorPage, homePage);

	if (homePage && homePage.isExact) {
		return ({ ...homePage,
			page : 'HOME'
		});
	}

	if (privacyPage && privacyPage.isExact) {
		return ({ ...privacyPage,
			page : 'PRIVACY'
		});
	}

	if (termsPage && termsPage.isExact) {
		return ({ ...privacyPage,
			page : 'TERMS'
		});
	}
}


export function sendToSlack(message, callback=null) {
	axios.post(API_ENDPT_URL, {
		action  : 'SLACK_MSG',
		payload : { message }
	}).then((response) => {
		console.log("SLACK_MSG", response.data);
		if (callback) {
			callback();
		}
	}).catch((error)=> {
	});
}
