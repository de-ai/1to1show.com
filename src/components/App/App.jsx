
import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

// import AlertDialog from '../overlays/AlertDialog';
import LoginModal from '../overlays/LoginModal';
import PopupNotification from '../overlays/PopupNotification';
import TopNav from '../sections/TopNav';
import BottomNav from '../sections/BottomNav';
import HomePage from '../pages/HomePage';
import PrivacyPage from '../pages/PrivacyPage';
import Status404Page from '../pages/Status404Page';
import TermsPage from '../pages/TermsPage';

import { Modals } from '../../consts/uris';

const wrapper = React.createRef();


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			authID    : 0,
			darkTheme : false,
			popup     : null,
			modals    : {
				login : false
			}
		};
	}

	componentDidMount() {
		console.log('App.componentDidMount()', this.props, this.state);
	}

	handlePopup = (payload)=> {
// 		console.log('App.handlePopup()', payload);
		this.setState({ popup : payload });
	};

	onToggleModal = (url, show)=> {
		console.log('App.onToggleModal()', url, show);
		const { modals } = this.state;

		if (show) {
			this.setState({ modals : { ...modals,
				login : (url === Modals.LOGIN)
			}});

		} else {
			this.setState({ modals : { ...modals,
				login : (url === Modals.LOGIN) ? false : modals.login
			} });
		}
	};

	handleToggleTheme = (event)=> {
		console.log('App.handleToggleTheme()', event);
		this.setState({ darkTheme : !this.state.darkTheme });
	};


	render() {
//   	console.log('App.render()', this.props, this.state);

		const { profile } = this.props;
  	const { darkTheme, popup, modals } = this.state;

  	return (<div className={`site-wrapper${(darkTheme) ? ' site-wrapper-dark' : ''}`}>
		  <TopNav darkTheme={darkTheme} onToggleTheme={this.handleToggleTheme} onModal={(url)=> this.onToggleModal(url, true)} />
	    <div className="content-wrapper" ref={wrapper}>
		    <Switch>
			    <Route exact path="/" render={()=> <HomePage onModal={(url)=> this.onToggleModal(url, true)} onPopup={this.handlePopup} />} />
			    <Route exact path="/legal" render={()=> <PrivacyPage />} />
			    <Route exact path="/terms" render={()=> <TermsPage />} />

			    <Route path="*"><Status404Page /></Route>
		    </Switch>
	    </div>
		  <BottomNav onModal={(url)=> this.onToggleModal(url, true)} />

		  <div className="modal-wrapper">
			  {(popup) && (<PopupNotification payload={popup} onComplete={()=> this.setState({ popup : null })}>
				  {popup.content}
			  </PopupNotification>)}

			  {(modals.login) && (<LoginModal
				  outro={(profile !== null)}
				  onModal={(url)=> this.onToggleModal(url, true)}
				  onPopup={this.handlePopup}
				  onComplete={()=> this.onToggleModal(Modals.LOGIN, false)}
// 				  onLoggedIn={this.handleLoggedIn}
			  />)}

			  {/*{(payDialog) && (<AlertDialog*/}
				  {/*title="Limited Account"*/}
				  {/*message="You must upgrade to an unlimited account to view more"*/}
				  {/*onComplete={this.handlePaidAlert}*/}
			  {/*/>)}*/}
		  </div>
	  </div>);
  }
}


export default (App);
