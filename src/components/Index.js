import React, { Component } from 'react';
import MenuButton from './MenuButton.js';
import MenuLink from './MenuLink.js';
import cloud from "../services/cloud.js";

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      onFly: false,
      registered: false
    };
    this.checkingRegister();
  }

  checkingRegister = () => {
    cloud.isRegistered(cloud.currentUser()).then(isRegistered=>{
      console.log('[Index] check if registered today: ', isRegistered);
      this.setState({
        onFly: false,
        registered: isRegistered
      });
    })
  }

  handleRegister = event => {
    this.setState({onFly: true});
    event.preventDefault();
    cloud.register(cloud.currentUser()).then(object=>{
      console.log('[Index] create register for: ', cloud.currentUser());
      this.setState({
        registered: true
      });
    })
  }
  render() {
    var label_id;
    if(this.state.registered)
      label_id = 'registered';
    else if(this.state.onFly)
      label_id = 'registering';
    else
      label_id = 'unregistered'
    return (
      <div className="menu-list">
        <MenuButton icon="Z" label_id={label_id} action = {this.state.registered ? null : this.handleRegister}/>
        <MenuLink icon="p" label_id='file-index' url='#/files' />
        <MenuLink icon="U" label_id='file-upload' url='#/upload' />
      </div>
    );
  }
}

export default Index;
