import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {Redirect} from 'react-router-dom';
import cloud from "../services/cloud.js";

class Login extends Component {
  constructor(props) {
    super(props);
    console.log('[Login] currentUser: ', cloud.currentUser());
    this.state = {
      email: "",
      password: "",
      redirectToIndex: cloud.currentUser() ? true : false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    cloud.login(this.state.email, this.state.password).then(user=>{
      console.log('[Login] parse logged: ', cloud.currentUser());
      this.setState({redirectToIndex: true});
    })
  }

  render() {
    if(this.state.redirectToIndex === true)
      return <Redirect to="/index" />
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel><FormattedMessage id="login.username"/></ControlLabel>
            <FormControl
              autoFocus
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <ControlLabel><FormattedMessage id="login.password"/></ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit">
            <FormattedMessage id="login"/>
          </Button>
        </form>
      </div>
    );
  }
}

export default Login;
