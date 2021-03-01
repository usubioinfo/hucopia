import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Brand} from 'react-bootstrap';

import './HNavbar.scss';

class HNavbar extends React.Component {

  constructor() {
    super();
    this.state = {};
    console.log('test');
  }

  render() {
    return (
      <div className="mx-5 mb-4 mt-2 nav-wrapper mx-auto">
        <Navbar>
          <Navbar.Brand>
            HuCoPIA
          </Navbar.Brand>

          <Nav className="mr-auto">
            <Nav.Link href="#" className="mx-1">
              Home
            </Nav.Link>
            <Nav.Link href="#" className="mx-1">
              About
            </Nav.Link>
            <Nav.Link href="#" className="mx-1">
              Data Set
            </Nav.Link>
            <Nav.Link href="#" className="mx-1">
              Help
            </Nav.Link>
          </Nav>

        </Navbar>
      </div>
    );
  }
}

export {HNavbar};
