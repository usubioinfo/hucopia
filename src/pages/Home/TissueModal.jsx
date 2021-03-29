import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { HChip } from 'components/HChip/HChip';
import './TissueModal.scss'

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

  onHide() {
    console.log('test');
  }

  render() {
    let protChips = this.props.tissues.map(protein => (
      <HChip text={protein} key={protein} />
    ));

    return (
      <Modal dialogClassName="modal-wid" show={this.props.show} onHide={e => {
          this.props.handler();
        }}>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={12}>
                {protChips}
              </Col>
            </Row>
            <Row>
              <Col sm={12} className="text-center">
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
