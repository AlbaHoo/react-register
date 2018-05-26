import React, { Component } from 'react';
import { Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {Redirect} from 'react-router-dom';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

import cloud from "../services/cloud.js";
class UploadEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCredit: 'credit',
      number: 0,
      note: "",
      setIssuedAt: false,
      issuedAt: moment().format('YYYY-MM-DD'),
      redirect: false,
      onFly: false
    };
  }

  validateForm() {
    return this.state.number > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  showIssuedDate = event => {
    this.setState({setIssuedAt: event.target.checked});
  }

  dateChange = (date, formattedDate) => {
    this.setState({issuedAt: formattedDate})
  }

  handleSubmit = event => {
    console.log(this.state);
    event.preventDefault();
    this.setState({onFly: true});
    cloud.uploadEntry(
      this.state.isCredit === 'credit',
      parseFloat(this.state.number),
      this.state.note,
      this.state.issuedAt
    ).then( parseObject =>{
      console.log('[UploadEntry] Entry uploaded: ', parseObject);
      this.setState({onFly: false, redirect: true})
    }).catch(e => {
      this.setState({message: e.message, onFly: false});
    });

  }

  render() {
    var datepicker;
    if(this.state.redirect === true)
      return <Redirect to="/entries" />
    if(this.state.setIssuedAt)
      datepicker = <DatePicker locale={locale} onChange={this.dateChange} />
    console.log(this.state.isCredit);
    var label = this.state.isCredit === 'credit' ? '收入' : '支出';
    return (
      <div className="UploadEntry container">
        <form onSubmit={this.handleSubmit}>
          <p>{this.state.message}</p>
          <div className="form-group">
            <ToggleButtonGroup type="radio" name="isCredit" defaultValue="credit">
              <ToggleButton value="dibet" onChange={this.handleChange}><FormattedMessage id="entry.dibet"/></ToggleButton>
              <ToggleButton value="credit" onChange={this.handleChange}><FormattedMessage id="entry.credit"/></ToggleButton>
            </ToggleButtonGroup>
         </div>

          <div className="form-group">
            <label htmlFor="number" className="col-form-label">
              <span>{label}</span>
              <FormattedMessage id="entry.number"/>
            </label>
            <input name="number" onChange={this.handleChange} type="number" step="0.10" className="form-control" />
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="show_issue_date" onChange={this.showIssuedDate}/>
            <label className="form-check-label" htmlFor="defaultCheck1">
              <FormattedMessage id="entry.anotherday"/>
            </label>
          </div>

          <div className="form-group">
            {datepicker}
          </div>

          <div className="form-group">
            <label htmlFor="note" className="col-form-label"><FormattedMessage id="entry.note"/></label>
            <input name="note" onChange={this.handleChange} type="text" className="form-control" />
          </div>

          <Button
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit">
            <FormattedMessage id={this.state.onFly ? "uploading" : "upload" }/>
          </Button>
        </form>
      </div>
    );
  }
}

export default UploadEntry;
