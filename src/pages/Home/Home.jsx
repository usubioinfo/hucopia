import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import Form from 'react-bootstrap/Form';

import './Home.scss';
import 'scss/components/forms.scss';
import 'scss/components/buttons.scss';

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
            <Col sm={6} className="text-left">
              <Form.Control className="kbl-form mb-4" as="textarea" rows={5} />
              <Button className="kbl-btn-1 mr-3">Sample Data</Button>
              <Button className="kbl-btn-2">Clear Data</Button>

              <h6 className="mt-3"><b>File Upload</b></h6>
                <InputGroup className="mb-3">
                  <Form.Control placeholder="No file selected" className="kbl-form"/>
                  <InputGroup.Append>
                    <Button className="kbl-btn-1">Upload</Button>
                  </InputGroup.Append>
                </InputGroup>
            </Col>

            <Col sm={6}>

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
