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
      list: [],
      filtered:[]
    };
    this.refreshList();
  }

  refreshList = () => {
    cloud.getFileList().then(list => {
      var formatted_list = [];
      list.map((object, i) => {
        return formatted_list.push([
          object.get('name'),
          object.get('file')._url,
          moment(object.get('createdAt')).format("YY-MM-DD HH:mm"),
          object.id
        ]);
      });
      this.setState({
        onFly: true,
        list: formatted_list
      });
    });
  }

  handleDelete = id => {
    if(window.confirm('确定？'))
      cloud.destroyObject('Files', id).then(() => this.refreshList());
  }

  handleSearch = event => {
    event.preventDefault();
    var str = event.target.value;
    this.setState({filtered: this.state.list.filter(e => e[0].toLowerCase().indexOf(str) > -1)})
  }

  render() {
    var list = this.state.filtered.length > 0 ? this.state.filtered : this.state.list;
    return (
      <div className="container">

        <div className="input-group input-group-md">
          <span className="input-group-addon" id="sizing-addon1">搜索<span role="img" aria-label="search">🔍</span></span>
          <input type="text" className="form-control" placeholder="搜索文件名字" onChange={this.handleSearch}/>
        </div>
        <br/>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"><FormattedMessage id="file.name"/></th>
              <th scope="col"><FormattedMessage id="created_at"/></th>
              <th scope="col"><FormattedMessage id="actions"/></th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((object, i) => {
                return  (
                  <tr key={i}>
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
