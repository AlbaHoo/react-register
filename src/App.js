import React, { Component } from 'react';
import Login from './components/Login';
import Index from './components/Index';
import UploadFile from './components/UploadFile';
import UploadEntry from './components/UploadEntry';
import FileList from './components/FileList';
import EntryList from './components/EntryList';
import Navs from './components/Navs.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import {Redirect} from 'react-router-dom';
import {
    HashRouter as Router,
    Route
} from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// react i18n
import {IntlProvider} from 'react-intl';
import zh_CN from './locales/zh-CN.json';

import cloud from "./services/cloud.js";

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App] currentUser: ',cloud.currentUser());
    this.state = {
      isAuthenticated: cloud.currentUser() ? true : false
    }
  }

  logout = event => {
    event.preventDefault();
    cloud.logout().then(() => {
      this.setState({isAuthenticated: false});
    });
  }

  render() {
    return (
      <IntlProvider
      locale='en'
      messages={zh_CN}>
        <Router>
          <div className="App">
            <Navs isAuthenticated={this.state.isAuthenticated} logout={this.logout}/>
            <div className="page-container">
              <Route path="/login" component={Login} />
              <ProtectedRoute path="/index" component={Index} />
              <ProtectedRoute path="/upload" component={UploadFile} />
              <ProtectedRoute path="/files" component={FileList} />
              <ProtectedRoute path="/entries" component={EntryList} />
              <ProtectedRoute path="/entry-upload" component={UploadEntry} />
            </div>
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
