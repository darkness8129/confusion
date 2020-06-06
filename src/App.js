import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import './App.css';
import Main from './components/MainComponent';
import { configureStore } from './redux/configureStore';

const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Main />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}
