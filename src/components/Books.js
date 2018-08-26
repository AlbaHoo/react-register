import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import cloud from "../services/cloud.js";
import MenuLink from './MenuLink.js';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
    this.refreshList();
  }

  refreshList = () => {
    cloud.getBookList().then(books => {
      var formatted_list = [];
      books.map((object, i) => {
        return formatted_list.push([
          object.id,
          object.get('name'),
          moment(object.get('createdAt')).format("YYYY-MM-DD"),
          object.get('description')
        ])
      });
      this.setState({
        books: formatted_list
      });
    });
  }

  handleDelete = id => {
    if(window.confirm('确定？'))
    cloud.destroyObject('Books', id).then(() => this.refreshList());
  }

  render() {
    var books = this.state.books;
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"><FormattedMessage id="book.name"/></th>
              <th scope="col"><FormattedMessage id="created_at"/></th>
              <th scope="col"><FormattedMessage id="actions"/></th>
            </tr>
          </thead>
          <tbody>
            {
              books.map((object, i) => {
                return  (
                  <tr key={i}>
                    <td>{object[1]}</td>
                    <td>{object[2]}</td>
                    <td><a className="btn btn-danger" onClick={() => this.handleDelete(object[0])}><FormattedMessage id="actions.delete"/></a></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <MenuLink icon="Q" label_id='new-book' url='#/new-book' />
      </div>
    );
  }
}
export default Books;
