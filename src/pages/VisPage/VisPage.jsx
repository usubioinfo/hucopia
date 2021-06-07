import React, { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './VisPage.scss';

import { Visualization } from 'components/Visualization/Visualization';

export class VisPage extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col sm={7}>
          <Visualization/>
        </Col>
      </Row>
    );
  }
}
