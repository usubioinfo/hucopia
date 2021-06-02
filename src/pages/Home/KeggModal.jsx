import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import SelectSearch from 'react-select-search';


import { HChip } from 'components/HChip/HChip';
import './TissueModal.scss';

import fuzzySearch from 'utils/fuzzy-search';

export class KeggModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAnnotations: []
    };

    this.selectSearch = this.selectSearch.bind(this);
    this.chipClicked = this.chipClicked.bind(this);
  }

  openModal() {

  }

  closeModal() {

  }

  onHide() {

  }

  selectSearch(annotation) {
    let copy = this.state.selectedAnnotations;

    if (copy.includes(annotation)) {
      return;
    }

    copy.push(annotation);

    this.setState({selectedAnnotations: copy});

  }

  chipClicked(tissue) {
    let index = this.state.selectedAnnotations.indexOf(tissue);
    if (index <= -1) {
      return;
    }

    let copy = this.state.selectedAnnotations;
    copy.splice(index, 1);

    this.setState({selectedAnnotations: copy})
  }

  render() {
    let chips = this.state.selectedAnnotations.map(annotation => (
      <HChip text={annotation} key={annotation}  ch={this.chipClicked}/>
    ));

    let emptyMsg = <div></div>;

    if (!chips.length) {
      emptyMsg = (
        <Row className="mt-3">
          <Col sm={12} className="text-center">
            <p>
              By default, all annotations are selected. Use the searchbar to select specific annotations.
            </p>
          </Col>
        </Row>)
    }

    this.searchOptions = this.props.annotations.filter(annotation => {
      if (!this.state.selectedAnnotations.includes(annotation)) {
        return true;
      }

      return false;
    })
    .map(annotation => {
      return {name: annotation, value: annotation};
    });

    return (
      <Modal dialogClassName="modal-wid tissue-modal" show={this.props.show} onHide={e => {
          this.props.handler();
        }}>
        <Modal.Body>
          <Container>
            <Row className="mb-4 mt-3">
              <Col sm={7}>
                <SelectSearch emptyMessage="Annotation not found"
                  options={this.searchOptions} search placeholder="Search annotations" name="tissue" filterOptions={fuzzySearch} onChange={this.selectSearch}
                  />
              </Col>
              <Col sm={5}>
                <Button className="kbl-btn-1 mr-2" onClick={(e) => {
                    this.setState({selectedAnnotations: [...this.props.annotations]});
                  }}>Select All</Button>
                <Button className="kbl-btn-2" onClick={(e) => {
                    this.setState({selectedAnnotations: []});
                  }}>Clear All</Button>
              </Col>
            </Row>
            {emptyMsg}
            <Row>
              <Col sm={12}>
                {chips}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={12} className="text-center">
                <Button className="kbl-btn-1 mr-3" onClick={e=> {
                    this.props.handler(this.state.selectedAnnotations);
                  }}>Close</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}
