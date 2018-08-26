import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {Redirect} from 'react-router-dom';
import cloud from "../services/cloud.js";

class NewBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      onFly: false,
      message: "",
      redirect: false
    };
  }

  validateForm() {
    return this.state.name.length > 0;
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({onFly: true});
    cloud.uploadBook(this.state.name, this.state.description).then( parseObject =>{
      this.setState({onFly: false, redirect: true})
    }).catch(e => {
      this.setState({message: e.message, onFly: false});
    });

  }

  render() {
    if(this.state.redirect === true)
      return <Redirect to="/books" />
    return (
      <div className="NewBook container">
        <form onSubmit={this.handleSubmit}>
          <p>{this.state.message}</p>
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel><FormattedMessage id="book.name"/></ControlLabel>
            <FormControl
              autoFocus
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="description" bsSize="large">
            <ControlLabel><FormattedMessage id="book.description"/></ControlLabel>
            <FormControl
              componentClass="textarea"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit">
            <FormattedMessage id={this.state.onFly ? "uploading" : "upload" }/>
          </Button>
        </form>
      </div>
    );
  }
}

export default NewBook;
