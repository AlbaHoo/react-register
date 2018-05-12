import React, { Component } from 'react';
import Login from './components/Login';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import Navs from './components/Navs.js';

import 'bootstrap/dist/css/bootstrap.css';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navs/>
          <div className="container">
            <Route path="/login" component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
