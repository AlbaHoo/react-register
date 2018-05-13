import React, { Component } from 'react';
import Card from './Card.js';

class Index extends Component {

  render() {
    var gymSrc =require('../images/tree.jpg');
    return (
      <div className="row">
        <div className="col-xs-4">
          <Card src={gymSrc} />
        </div>
      </div>
    );
  }
}

export default Index;
