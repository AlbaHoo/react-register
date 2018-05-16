import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import { Link } from "react-router";
import '../css/Card.css'

class Card extends Component {
  render() {
    return (
      <div className="btn-container">
        <a href='#/register'>
          <div className="card">
            <div>
              <span data-icon="2" className="icon"></span>
            </div>
            <div className="text">
              <FormattedMessage id='card1'/>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default Card;
