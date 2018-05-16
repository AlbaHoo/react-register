import React, { Component } from 'react';
import Card from './Card.js';

class Index extends Component {

  render() {
    var gymSrc =require('../images/tree.jpg');
    return (
      <div>
        <Card src={gymSrc} />
      </div>
    );
  }
}

export default Index;
