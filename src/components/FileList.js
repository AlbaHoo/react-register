import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import cloud from "../services/cloud.js";
import MenuLink from './MenuLink.js';
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
          moment(object.get('createdAt')).format("YY-MM-DD HH:mm"),
          object.id
        ])
      });
      this.setState({
        onFly: true,
        list: formatted_list
      });
    });
  }

  handleDelete = id => {
    cloud.destroyObject('Files', id).then(() => this.refreshList());
  }

  render() {
    return (
      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"><FormattedMessage id="file.name"/></th>
              <th scope="col"><FormattedMessage id="file.created_at"/></th>
              <th scope="col"><FormattedMessage id="file.actions"/></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.list.map((object, i) => {
                return  (
                  <tr>
                    <th scope="row">{i+1}</th>
                    <td>
                      <a href={object[1]}>
                        {object[0]}
                      </a>
                    </td>
                    <td>{object[2]}</td>
                    <td><a className="btn btn-danger" onClick={() => this.handleDelete(object[3])}><FormattedMessage id="actions.delete"/></a></td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
        <MenuLink icon="U" label_id='file-upload' url='#/upload' />
      </div>
    );
  }
}
export default FileList;
