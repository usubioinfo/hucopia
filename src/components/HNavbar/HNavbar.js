import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './HNavbar.scss';
import { env } from 'env.js';

class HNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active
    };
    console.log(this.props.active);

    this.activeLink = this.activeLink.bind(this);
  }

  activeLink(link) {
    console.log(link)
    console.log(this.props.active)
    if (link === this.props.active) {
      return true;
    }

    return false;
  }

  render() {console.log(this.props.active)
    let className = 'mx-1';
    let active = 'mx-1 current';

    return (
      <div className="mx-5 mb-4 mt-3 nav-wrapper mx-auto">
        <Navbar className="justify-content-center">
          <Navbar.Brand className="h-brand">
            <b>HuCoPIA</b>
          </Navbar.Brand>

          <Nav className="">
            <Nav.Link href={`${env.BASE_URL}/`} className={'home' === this.props.active ? active : className}>
              Home
            </Nav.Link>
            <Nav.Link href={`${env.BASE_URL}/about`} className={'about' === this.props.active ? active : className}>
              About
            </Nav.Link>
            <Nav.Link href={`${env.BASE_URL}/dataset`} className={'dataset' === this.props.active ? active : className}>
              Data Set
            </Nav.Link>
            <Nav.Link href={`${env.BASE_URL}/help`} className={'help' === this.props.active ? active : className}>
              Help
            </Nav.Link>
          </Nav>

        </Navbar>
      </div>
    );
  }
}

export {HNavbar};
