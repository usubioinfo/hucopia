import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import Form from 'react-bootstrap/Form';

import { IconContext } from 'react-icons';
import { FaRegQuestionCircle } from 'react-icons/fa';

import './Home.scss';
import 'scss/components/forms.scss';
import 'scss/components/buttons.scss';

import { HSelector } from 'components/HSelector/HSelector';

export class Home extends Component {

  render() {
    return (
      <div>
        <Container className="px-4">
          <Row>
            <Col sm={6}>
              <div className="col-title">
                Human Search Criteria
                <IconContext.Provider value={{ size: "1.2em", className: "ml-2 q-icon" }}>
                  <FaRegQuestionCircle />
                </IconContext.Provider>
              </div>
              <div className="px-5"><div className="line mt-2 mb-4"></div></div>
            </Col>
            <Col sm={6}>
              <div className="col-title">Virus Search Criteria</div>
              <div className="px-5"><div className="line mt-2 mb-4"></div></div>
            </Col>
          </Row>

          <Row>
            <Col sm={6} className="text-left">

              <Form.Control className="kbl-form mb-4" as="textarea" rows={5} placeholder="Example: NR3C1,NR1I2,ANXA1" />
              <Button className="kbl-btn-1 mr-3">Sample Data</Button>
              <Button className="kbl-btn-2">Clear Data</Button>

              <h6 className="mt-4 pl-2"><b>File Upload</b></h6>
              <InputGroup className="mb-4">
                <Form.Control placeholder="No file selected" className="kbl-form"/>
                <InputGroup.Append>
                  <Button className="kbl-btn-1">Upload</Button>
                </InputGroup.Append>
              </InputGroup>

              <h6 className="pl-2"><b>Annotation Type</b></h6>
              <div className="px-0"><div className="line mt-2 mb-3"></div></div>

              <HSelector text="Tissue Expression" />
              <HSelector text="KEGG Pathway" />
              <HSelector text="Gene Ontology" />
            </Col>

            <Col sm={6}>

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
