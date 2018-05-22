import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import '../css/Card.css'

class MenuButton extends Component {
  render() {
    return (
      <div className="btn-container">
        <div className={"card " + (this.props.action ? '' : 'disabled')} onClick={this.props.action}>
          <div className="icon" data-icon={this.props.icon}>
          </div>
          <div className="text">
            <FormattedMessage id={this.props.label_id}/>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuButton;
