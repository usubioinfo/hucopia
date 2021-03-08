import React, { Component } from 'react';
import Fuse from 'fuse.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import SelectSearch from 'react-select-search';

import Form from 'react-bootstrap/Form';

import { IconContext } from 'react-icons';
import { FaRegQuestionCircle } from 'react-icons/fa';

import './Home.scss';
import 'scss/style.scss';
import 'scss/components/forms.scss';
import 'scss/components/buttons.scss';
import 'scss/components/search-form.scss';

import { HSelector } from 'components/HSelector/HSelector';
import { HChip } from 'components/HChip/HChip';

import { PATHOGEN_PROTEINS } from 'constants.js';

const fuzzySearch = (options) => {
  const fuse = new Fuse(options, {
      keys: ['name', 'groupName'],
      threshold: 0.3,
  });

  return (value) => {
      if (!value.length) {
          return options;
      }

      return fuse.search(value);
  };
}

export class Home extends Component {

  searchOptions;

  constructor(props) {
    super(props);

    this.searchOptions = PATHOGEN_PROTEINS.map(protein => {
      return {name: protein, value: protein};
    });

    this.state = {
      selectedAnnotation: 'tissue',
      selectedVirus: 'scv2',
      interactionCategory: 'unique',
      selectedPatProteins: [...PATHOGEN_PROTEINS],
      selectedIntTypes: ['interolog']
    }



    this.selectAnnotation = this.selectAnnotation.bind(this);
    this.selectVirus = this.selectVirus.bind(this);
    this.selectIntCategory = this.selectIntCategory.bind(this);
    this.patProtClicked = this.patProtClicked.bind(this);
    this.selectIntType = this.selectIntType.bind(this);
  }

  selectAnnotation(type) {
    this.setState((state) => {
      return {selectedAnnotation: type}
    });
  }

  selectVirus(virus) {
    this.setState((state) => {
      return {selectedVirus: virus}
    });
  }

  selectIntCategory(category) {
    this.setState((state) => {
      return {interactionCategory: category}
    });
  }

  selectIntType(intType) {
    let selectedIntTypes = this.state.selectedIntTypes;

    if (this.state.selectedIntTypes.includes(intType)) {
      let index = this.state.selectedIntTypes.indexOf(intType);

      selectedIntTypes.splice(index, 1);
      this.setState((state) => {
        return {selectedIntTypes: selectedIntTypes}
      });
    } else {
      selectedIntTypes.push(intType);
      this.setState((state) => {
        return {selectedIntTypes: selectedIntTypes}
      });
    }
  }

  isAnnotationSelected(type) {
    return this.state.selectedAnnotation === type ? true : false;
  }

  isVirusSelected(virus) {
    return this.state.selectedVirus === virus ? true : false;
  }

  isCategorySelected(category) {
    return this.state.interactionCategory === category ? true : false;
  }

  isIntTypeSelected(intType) {
    return this.state.selectedIntTypes.includes(intType) ? true : false;
  }

  selectAllClicked() {
    this.setState({selectedPatProteins: PATHOGEN_PROTEINS});
  }

  // Clear all pathogen proteins
  clearAllClicked() {
    this.setState({selectedPatProteins: []});
  }

  patProtClicked(protein) {
    let index = this.state.selectedPatProteins.indexOf(protein);
    if (index <= -1) {
      return;
    }

    let prots = this.state.selectedPatProteins;
    prots.splice(index, 1);

    this.setState((state) => {
      return {selectedPatProteins: prots}
    });
  }

  selectSearch(protein) {
    console.log(protein);
  }

  render() {

    let protChips = this.state.selectedPatProteins.map(protein => (
      <HChip text={protein} key={protein} ch={this.patProtClicked}/>
    ));

    this.searchOptions = PATHOGEN_PROTEINS.filter(protein => {
      if (!this.state.selectedPatProteins.includes(protein)) {
        return true;
      }
    })
    .map(protein => {
      return {name: protein, value: protein};
    });

    return (
      <div>
        <Container className="px-0 pt-5">
          <Row className="mb-2">
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
            <Col sm={6} className="text-left px-4">

              <Row>
                <Col sm={12}>
                  <Form.Control className="kbl-form mb-4" as="textarea" rows={5} placeholder="Example: NR3C1, NR1I2, ANXA1" />
                  <Button className="kbl-btn-1 mr-3">Sample Data</Button>
                  <Button className="kbl-btn-2">Clear Data</Button>

                  <h6 className="mt-5 pl-2"><b>File Upload</b></h6>
                  <InputGroup className="mb-5">
                    <Form.Control placeholder="No file selected" className="kbl-form"/>
                    <InputGroup.Append>
                      <Button className="kbl-btn-1">Upload</Button>
                    </InputGroup.Append>
                  </InputGroup>

                  <h5 className="pl-2"><b>Annotation Type</b></h5>
                  <div className="px-0"><div className="line mt-2 mb-3"></div></div>

                  <HSelector text="Tissue Expression" selected={this.isAnnotationSelected('tissue')} name="tissue" ch={this.selectAnnotation}/>
                  <HSelector text="Localization" selected={this.isAnnotationSelected('local')} name="local" ch={this.selectAnnotation}/>
                  <HSelector text="KEGG Pathway" selected={this.isAnnotationSelected('kegg')} name="kegg" ch={this.selectAnnotation}/>
                  <HSelector text="Gene Ontology" selected={this.isAnnotationSelected('gene')} name="gene" ch={this.selectAnnotation}/>
                </Col>
              </Row>

              <Row className="pt-4">
                <Col sm={12}>
                  <Button className="kbl-btn-1 mr-3">Select Annotation Terms</Button>
                </Col>
              </Row>
            </Col>

            <Col sm={6} className="px-4">
              <Row>
                <Col sm={6} className="text-left">
                  <h6><b>Virus</b></h6>

                  <HSelector text="SARS-CoV-2" selected={this.isVirusSelected('scv2')} name="scv2" ch={this.selectVirus}/><br/>
                  <HSelector text="SARS-CoV-1" selected={this.isVirusSelected('scv1')} name="scv1" ch={this.selectVirus}/><br/>
                  <HSelector text="MERS" selected={this.isVirusSelected('mers')} name="mers" ch={this.selectVirus}/><br/>
                </Col>
                <Col sm={6} className="text-left">
                  <h6><b>Interaction Category</b></h6>

                  <HSelector text="Unique" selected={this.isCategorySelected('unique')} name="unique" ch={this.selectIntCategory}/><br/>
                  <HSelector text="Common" selected={this.isCategorySelected('common')} name="common" ch={this.selectIntCategory}/><br/>
                  <HSelector text="Both" selected={this.isCategorySelected('all')} name="all" ch={this.selectIntCategory}/><br/>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col className="text-left">
                  <h6><b>Interaction Type</b></h6>
                  <HSelector multi={true} text="Interolog" name='interolog' selected={this.isIntTypeSelected('interolog')} ch={this.selectIntType}/>
                  <HSelector multi={true} text="Domain" name='domain' selected={this.isIntTypeSelected('domain')} ch={this.selectIntType}/>
                  <HSelector multi={true} text="Consensus" name='consensus' selected={this.isIntTypeSelected('consensus')} ch={this.selectIntType}/>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col sm={12} className="text-left">
                  <h5 className="mt-3"><b>Pathogen Proteins</b></h5>
                  <Row>
                    <Col sm={7}>
                      <SelectSearch emptyMessage="Protein not found"
                        options={this.searchOptions} search placeholder="Search proteins" name="protein" filterOptions={fuzzySearch} onChange={this.selectSearch}
                        />
                    </Col>

                    <Col sm={5}>
                      <Button className="kbl-btn-1 mr-2" onClick={(e) => {
                          this.selectAllClicked()
                        }}>Select All</Button>
                      <Button className="kbl-btn-2" onClick={(e) => {
                          this.clearAllClicked()
                        }}>Clear All</Button>
                    </Col>
                  </Row>

                  <Row className="mt-3 justify-content-center">
                    <Col sm={12}>
                      {protChips}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <Button className="kbl-btn-1 px-5">Show Interactions</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
