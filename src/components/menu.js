import React from 'react';

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


class TopMenu extends React.Component {
  render() {
    return <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">repoXplorer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Projects</Nav.Link>
          <Nav.Link href="/">Groups</Nav.Link>
          <Nav.Link href="/">Contributors</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  }
}

export default TopMenu
