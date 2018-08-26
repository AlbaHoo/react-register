import React, { Component } from 'react';
import MenuButton from './MenuButton.js';
import MenuLink from './MenuLink.js';
import cloud from "../services/cloud.js";

class Index extends Component {

  render() {
    var label_id;
    return (
      <div className="menu-list">
        <MenuLink icon="p" label_id='file-index' url='#/files' />
        <MenuLink icon="z" label_id='entry-index' url='#/entries' />
      </div>
    );
  }
}

export default Index;
