import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";

class Navs extends Component {

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">MySite</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">
              home
            </NavItem>
            <NavItem eventKey={2} href="#">
             Events
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/login">
              login
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navs;
