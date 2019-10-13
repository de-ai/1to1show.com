
import React, { Component } from 'react';
import './HomePage.css';

import axios from 'axios';
import { Browsers, Strings } from 'lang-js-utils';

import BasePage from '../BasePage';
import { API_ENDPT_URL } from '../../../consts/uris';

import pageContent from '../../../assets/json/content-home-page';
import itunesLogo from '../../../assets/images/logos/logo-itunes.png';
import spotifyLogo from '../../../assets/images/logos/logo-spotify.png';


class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title      : (Browsers.isMobile.ANY()) ? pageContent.mobile.title: pageContent.desktop.title,
			email      : '',
			emailValid : false,
			emailReset : false,
			submitted  : false
		};
	}

	handleTextfieldChange = (event)=> {
// 		console.log(this.constructor.name, '.handleTextfieldChange()', event.target.value, this.state.email, this.state.emailValid, this.state.emailReset);
		const email = event.target.value;
		const emailValid = Strings.isEmail(email);

		this.setState({ email,
// 			emailValid : emailValid || email.length === 0
			emailValid : emailValid || !email.includes('!') || email.length === 0
		});
	};

	handleTextfieldFocus = (event)=> {
// 		console.log(this.constructor.name, '.handleTextfieldFocus()', event.target.value, this.state.email, this.state.emailValid, this.state.emailReset);

		const email = event.target.value;
		this.setState({
			email      : (Strings.isEmail(email)) ? email : '',
			emailValid : true,
			emailReset : false
		});
	};

	handleMouseLeave = (event)=> {
// 		console.log(this.constructor.name, '.handleMouseLeave()', event.target.value, this.state.email, this.state.emailValid, this.state.emailReset);

		const emailValid = Strings.isEmail(event.target.value);
		this.setState({ emailValid })
	};

	handleTextfieldBlur = (event)=> {
// 		console.log(this.constructor.name, '.handleTextfieldBlur()', event.target.value, this.state.email, this.state.emailValid, this.state.emailReset);

		const emailValid = Strings.isEmail(event.target.value);
		this.setState({ emailValid })
	};

	handleSubmit = (event)=> {
		console.log(this.constructor.name, '.handleSubmit()');
		event.preventDefault();

		const { email } = this.state;
		if (Strings.isEmail(email)) {
			axios.post(API_ENDPT_URL, {
				action  : 'NEWSLETTER_SIGNUP',
				payload : { email }
			}).then((response) => {
				console.log('NEWSLETTER_SIGNUP', response.data);
				this.setState({
					email      : 'Thank you for signing up!',
					emailValid : true,
					emailReset : false,
					submitted  : true
				});
			}).catch((error)=> {
			});

		} else {
			this.setState({
				emailValid : false,
				emailReset : true
			});
		}
	};

	render() {
// 		console.log(this.constructor.name, '.render()', this.props, this.state);

		const { title, email, emailReset, submitted } = this.state;
		return (
			<BasePage className="home-page-wrapper">
				<h1 dangerouslySetInnerHTML={{ __html : title }} />
				<div className="page-content-wrapper home-page-content-wrapper">
					<div className="home-page-form">
						<form onSubmit={this.handleSubmit}>
							{(emailReset)
								? (<input disabled={submitted} type="email" name="email" placeholder="Enter Email Address" value={email} onFocus={this.handleTextfieldFocus} onChange={this.handleTextfieldChange} onMouseLeave={this.handleMouseLeave} onBlur={this.handleTextfieldBlur} required autoComplete="off" />)
								: (<input disabled={submitted} type="text" name="email" placeholder="Enter Email Address" value={email} onFocus={this.handleTextfieldFocus} onChange={this.handleTextfieldChange} onMouseLeave={this.handleMouseLeave} onBlur={this.handleTextfieldBlur} autoComplete="off" />)
							}
							<button disabled={submitted} type="submit" onClick={(event)=> this.handleSubmit(event)} style={{ opacity : (submitted) ? 0.5 : 1.0 }}>Sign Up for Newsletter</button>
						</form>
					</div>

					<div className="home-page-logo-wrapper">
						<img className="home-page-content-logo home-page-content-logo-itunes" src={itunesLogo} alt="iTunes Store" /><br />
						<img className="home-page-content-logo home-page-content-logo-spotify" src={spotifyLogo} alt="Spotify" />
					</div>
				</div>
			</BasePage>
		);
	}
}


export default (HomePage);
