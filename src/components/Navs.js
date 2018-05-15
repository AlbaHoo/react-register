import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import cloud from "../services/cloud.js";

class Navs extends Component {

  render() {
    console.log('[Navs] isAuthenticationed: ', this.props.isAuthenticated);
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#"><FormattedMessage id="title"/></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#/index">
              <FormattedMessage id="menu1"/>
            </NavItem>
            <NavItem eventKey={2} href="#/register">
              <FormattedMessage id="menu2"/>
            </NavItem>
          </Nav>
          <Nav pullRight>
            { cloud.currentUser()
              ? <NavItem href="/#" onClick={this.props.logout}>
                  <FormattedMessage id="logout"/>
                </NavItem>
              : <NavItem href={'#/login'}>
                  <FormattedMessage id="login"/>
                </NavItem>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navs;
