import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import cloud from "../services/cloud.js";
import MenuLink from './MenuLink.js';
var moment = require('moment');

class EntryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      filtered:[]
    };
    this.refreshList();
  }

  refreshList = () => {
    cloud.getEntryList().then(list => {
      var formatted_list = [];
      list.map((object, i) => {
        var positive = object.get('isCredit');
        var number = object.get('number');
        formatted_list.push([
          moment(object.get('issuedAt')).format("YY-MM-DD"),
          positive ? number : '',
          positive ? '' : number,
          object.get('note'),
          object.id
        ])
      });
      this.setState({
        list: formatted_list
      });
    });
  }

  handleDelete = id => {
    cloud.destroyObject('Entries', id).then(() => this.refreshList());
  }

  handleSearch = event => {
    event.preventDefault();
    var str = event.target.value;
    this.setState({filtered: this.state.list.filter(e => e[2].toLowerCase().indexOf(str) > -1)})
  }

  render() {
    var list = this.state.filtered.length > 0 ? this.state.filtered : this.state.list;
    return (
      <div className="container">

        <div className="input-group input-group-md">
          <span className="input-group-addon" id="sizing-addon1">搜索🔍</span>
          <input type="text" className="form-control" placeholder="搜索文件名字" onChange={this.handleSearch}/>
        </div>
        <br/>

        <table className="table">
          <thead>
            <tr>
              <th scope="col"><FormattedMessage id="created_at"/></th>
              <th scope="col"><FormattedMessage id="entry.credit"/></th>
              <th scope="col"><FormattedMessage id="entry.dibet"/></th>
              <th scope="col" style={{ width: '20%' }}><FormattedMessage id="entry.note"/></th>
              <th scope="col"><FormattedMessage id="actions"/></th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((object, i) => {
                return  (
                  <tr key={i}>
                    <td>{object[0]}</td>
                    <td>{object[1]}</td>
                    <td>{object[2]}</td>
                    <td>{object[3]}</td>
                    <td><a className="btn btn-danger" onClick={() => this.handleDelete(object[4])}><FormattedMessage id="actions.delete"/></a></td>
                  </tr>
                )
              })
            }
            <tr>
              <td>合计</td>
              <td>{list.reduce((sum, currentValue) => sum + (currentValue[1] ? currentValue[1] : 0), 0)}</td>
              <td>{list.reduce((sum, currentValue) => sum + (currentValue[2] ? currentValue[2] : 0), 0)}</td>
            </tr>
          </tbody>
        </table>
        <MenuLink icon="U" label_id='entry-upload' url='#/entry-upload' />
      </div>
    );
  }
}
export default EntryList;
