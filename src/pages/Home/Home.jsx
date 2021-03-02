import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

import './Home.scss';
import 'scss/components/forms.scss';

export class Home extends Component {

  render() {
    return (
      <div>
        <Container className="px-4">
          <Row>
            <Col sm={6}>
              <div className="col-title">Human Search Criteria</div>
              <div className="px-5"><div className="line mt-2 mb-4"></div></div>
            </Col>
            <Col sm={6}>
              <div className="col-title">Virus Search Criteria</div>
              <div className="px-5"><div className="line mt-2 mb-4"></div></div>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <Form.Control className="kbl-form" as="textarea" rows={5} />
            </Col>

            <Col sm={6}>

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
