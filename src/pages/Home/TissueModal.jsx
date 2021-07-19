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

export class TissueModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTissues: []
    };

    this.selectSearch = this.selectSearch.bind(this);
    this.tissueChipClicked = this.tissueChipClicked.bind(this);
  }

  openModal() {

  }

  closeModal() {

  }

  onHide() {
    
  }

  selectSearch(tissue) {
    let tissueCopy = this.state.selectedTissues;

    if (tissueCopy.includes(tissue)) {
      return;
    }

    tissueCopy.push(tissue);

    this.setState({selectedTissues: tissueCopy});

  }

  tissueChipClicked(tissue) {
    let index = this.state.selectedTissues.indexOf(tissue);
    if (index <= -1) {
      return;
    }

    let tissueCopy = this.state.selectedTissues;
    tissueCopy.splice(index, 1);

    this.setState({selectedTissues: tissueCopy})
  }

  render() {
    let protChips = this.state.selectedTissues.map(protein => (
      <HChip text={protein} key={protein}  ch={this.tissueChipClicked}/>
    ));

    let emptyTissueMsg = <div></div>;

    if (!protChips.length) {
      emptyTissueMsg = (
        <Row className="mt-3">
          <Col sm={12} className="text-center">
            <p>
              By default, all tissues are selected. Use the searchbar to select tissues.
            </p>
          </Col>
        </Row>)
    }

    this.searchOptions = this.props.tissues.filter(tissue => {
      if (!this.state.selectedTissues.includes(tissue)) {
        return true;
      }

      return false;
    })
    .map(tissue => {
      return {name: tissue, value: tissue};
    });

    return (
      <Modal dialogClassName="modal-wid tissue-modal" show={this.props.show} onHide={e => {
          this.props.handler('showTissueModal', 'selectedTissues', this.state.selectedTissues);
        }}>
        <Modal.Body>
          <Container>
            <Row className="mb-4 mt-3">
              <Col sm={7}>
                <SelectSearch emptyMessage="Tissue not found"
                  options={this.searchOptions} search placeholder="Search tissues" name="tissue" filterOptions={fuzzySearch} onChange={this.selectSearch}
                  />
              </Col>
              <Col sm={5}>
                <Button className="kbl-btn-1 mr-2" onClick={(e) => {
                    this.setState({selectedTissues: [...this.props.tissues]});
                  }}>Select All</Button>
                <Button className="kbl-btn-2" onClick={(e) => {
                    this.setState({selectedTissues: []});
                  }}>Clear All</Button>
              </Col>
            </Row>
            {emptyTissueMsg}
            <Row>
              <Col sm={12}>
                {protChips}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={12} className="text-center">
                <Button className="kbl-btn-1 mr-3" onClick={e=> {
                    this.props.handler('showTissueModal', 'selectedTissues', this.state.selectedTissues);
                  }}>Close</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}
