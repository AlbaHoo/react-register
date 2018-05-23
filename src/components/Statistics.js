// TODO: a page for dashboard
import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import cloud from "../services/cloud.js";
var moment = require('moment');

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onFly: false,
      list: []
    };
    this.refreshList();
  }

  refreshList = () => {
    this.setState({onFly: true});
    cloud.getStatistics().then(list => {
      this.setState({
        onFly: false,
        list: list
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="list-group">
          {
            this.state.list.map((object, i) => {
              return <div>aaa</div>;
            })
          }
        </div>
      </div>
    );
  }
}

export default FileList;
