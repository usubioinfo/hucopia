import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class TissueModal extends Component {
  constructor(props) {
    super(props);
    console.log('test')

    this.state = {

    };
  }

  openModal() {

  }

  closeModal() {

  }

  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={12}>
                Testing
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Button className="kbl-btn-1 mr-3" onClick={e=> {
                    this.props.handler();
                  }}>Close</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}
