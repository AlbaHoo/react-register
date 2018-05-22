import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import cloud from "../services/cloud.js";

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      file: "",
      onFly: false,
      message: ""
    };
  }

  validateForm() {
    return this.state.name.length > 0 && this.state.file.name;
  }

  handleNameChange = event => {
    this.setState({name: event.target.value});
  }

  handleFileChange = event => {
    console.log(event.target.files[0]);
    this.setState({file: event.target.files[0]});
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({onFly: true});
    console.log(this.state.file);
    cloud.uploadFile(this.state.name, this.state.file).then( parseObject =>{
      console.log('[UploadFile] file uploaded: ', parseObject);
      this.setState({onFly: false})
    }).catch(e => {
      this.setState({message: e.message, onFly: false});
    });

  }

  render() {
    return (
      <div className="UploadFile container">
        <form onSubmit={this.handleSubmit}>
          <p>{this.state.message ? '用户名或者密码错误' : ''}</p>
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel><FormattedMessage id="upload.name"/></ControlLabel>
            <FormControl
              autoFocus
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </FormGroup>

          <FormGroup controlId="file" bsSize="large">
            <ControlLabel><FormattedMessage id="upload.file"/></ControlLabel>
            <FormControl
              onChange={this.handleFileChange}
              type="file"
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

export default UploadFile;
