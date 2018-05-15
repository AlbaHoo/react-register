import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import { Link } from "react-router";
import '../css/Card.css'

class Card extends Component {
  render() {
    return (
      <a href='#/register'>
        <div className="card">
          <div className='img'>
            <img src={this.props.src}/>
          </div>
          <div className="text">
            <FormattedMessage id='card1'/>
          </div>
        </div>
      </a>
    );
  }
}

export default Card;
