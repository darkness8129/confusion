import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import './App.css';
import Main from './components/MainComponent';

export default class App extends Component {

	render() {
		return (
			<div className="App">
				<Main />
			</div>
		);
	}
}
