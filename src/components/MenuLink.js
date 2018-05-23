import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import '../css/Card.css'

class MenuLink extends Component {
  render() {
    return (
      <div className="btn-container">
        <a href={this.props.url}>
          <div className="card">
            <div>
              <span data-icon={this.props.icon} className="icon"></span>
            </div>
            <div className="text">
              <FormattedMessage id={this.props.label_id}/>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default MenuLink;
