import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import cloud from "../services/cloud.js";
var moment = require('moment');

class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onFly: false,
      list: []
    };
    this.refreshList();
  }

  refreshList = () => {
    cloud.getFileList().then(list => {
      var formatted_list = [];
      list.map((object, i) => {
        formatted_list.push([
          object.get('name'),
          object.get('file')._url,
          moment(object.get('createdAt')).format("YY-MM-DD HH:mm")
        ])
      });
      this.setState({
        onFly: true,
        list: formatted_list
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="list-group">
          {
            this.state.list.map((object, i) => {
              return  (
                <a href={object[1]} class="list-group-item list-group-item-action">
                  {object[0]}
                  <span class="badge badge-primary badge-pill">{object[2]}</span>
                </a>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default FileList;
