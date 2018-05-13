import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import cloud from "../services/cloud.js";

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      registered: false
    };
  }

  handleRegister = event => {
    event.preventDefault();
    cloud.register(cloud.currentUser()).then(object=>{
      console.log('[Register] create register for: ', cloud.currentUser());
      this.setState({
        registered: true
      });
    })
  }

  render() {
    return(
      <Button
        block
        onClick={this.state.registered ? null : this.handleRegister}
        bsStyle="success"
        bsSize="large">
        <FormattedMessage id={this.state.registered ? 'registered' : 'register'}/>
      </Button>
    );
  }
}

export default Register;
