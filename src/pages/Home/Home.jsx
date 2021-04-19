import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import AnimateHeight from 'react-animate-height';

import SelectSearch from 'react-select-search';

import Form from 'react-bootstrap/Form';

import { IconContext } from 'react-icons';
import { FaRegQuestionCircle } from 'react-icons/fa';

import * as ExpressionService from 'services/expression.service';
import * as ResultService from 'services/result.service';
import * as GoService from 'services/go.service';
import * as KeggService from 'services/kegg.service';

import './Home.scss';
import 'scss/style.scss';
import 'scss/loaders/loader1.scss';
import 'scss/components/forms.scss';
import 'scss/components/buttons.scss';
import 'scss/components/search-form.scss';

import { HSelector } from 'components/HSelector/HSelector';
import { HChip } from 'components/HChip/HChip';
import { FileInput } from 'components/FileInput/FileInput';
import { ResultCard } from 'components/ResultCard/ResultCard';

import fuzzySearch from 'utils/fuzzy-search';

import { PATHOGEN_PROTEINS } from 'constants.js';

import TissueResults from 'pages/TissueResults/TissueResults';
import GoResults from 'components/GoResults/GoResults';
import KeggResults from 'components/KeggResults/KeggResults';

import { TissueModal } from './TissueModal';

import { env } from 'env.js';

export class Home extends Component {

  searchOptions;

  constructor(props) {
    super(props);

    this.searchOptions = PATHOGEN_PROTEINS.map(protein => {
      return {name: protein, value: protein};
    });

    this.state = {
      selectedAnnotation: 'tissue',
      selectedVirus: 'sars-cov-2',
      interactionCategory: 'unique',
      selectedPatProteins: [],
      selectedIntTypes: ['interolog'],
      genes: '',
      interactionLoading: false,
      displayedResults: '',
      results: [],
      showControls: true,
      height: 'auto',
      showTissueModal: false,
      tissueOptions: [],
      selectedTissues: [],
      resultId: '',
      resultUrls: [],
      selectedGoTerms: [],
      geneHintOn: false
    }


    this.selectAnnotation = this.selectAnnotation.bind(this);
    this.selectGoTerm = this.selectGoTerm.bind(this);
    this.selectVirus = this.selectVirus.bind(this);
    this.selectIntCategory = this.selectIntCategory.bind(this);
    this.patProtClicked = this.patProtClicked.bind(this);
    this.selectIntType = this.selectIntType.bind(this);
    this.selectSearch = this.selectSearch.bind(this);
    this.handleGeneChange = this.handleGeneChange.bind(this);
    this.closeTissueModal = this.closeTissueModal.bind(this);
    this.fileSelected = this.fileSelected.bind(this);
  }

  componentDidMount() {
    axios.get(`${env.BACKEND}/expression/annotations`)
      .then(res => {
        console.log(res.data);
        this.setState({tissueOptions: res.data.payload});
      });
  }

  handleGeneChange(e) {
    this.setState({ genes: e.target.value });
  }

  selectAnnotation(type) {
    if (this.state.selectedAnnotation === 'kegg' && type !== this.state.selectedAnnotation) {
      this.setState({genes: ''});
    } else if (this.state.selectedAnnotation !== 'kegg' && type === 'kegg') {
      this.setState({genes: ''});
    }
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

  selectGoTerm(term) {
    let selectedGoTerms = this.state.selectedGoTerms;

    if (this.state.selectedGoTerms.includes(term)) {
      let index = this.state.selectedGoTerms.indexOf(term);

      selectedGoTerms.splice(index, 1);
      this.setState((state) => {
        return {selectedGoTerms: selectedGoTerms}
      });
    } else {
      selectedGoTerms.push(term);
      this.setState((state) => {
        return {selectedGoTerms: selectedGoTerms}
      });
    }
  }

  isGoTermSelected(term) {
    return this.state.selectedGoTerms.includes(term) ? true : false;
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
    this.searchOptions = [];
    this.setState({selectedPatProteins: [...PATHOGEN_PROTEINS]});
  }

  // Clear all pathogen proteins
  clearAllClicked() {
    this.searchOptions = PATHOGEN_PROTEINS.map(protein => {
      return {name: protein, value: protein};
    });
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
    let patProteins = this.state.selectedPatProteins;

    if (patProteins.includes(protein)) {
      return;
    }

    patProteins.push(protein);

    this.setState({selectedPatProteins: patProteins});
  }

  async showInteractionsClicked() {

    let tissues = this.state.tissueOptions;

    if (this.state.selectedTissues && this.state.selectedTissues.length) {
      tissues = this.state.selectedTissues;
    }

    this.setState({interactionLoading: true});

    const getIdRes = await ResultService.getNewResultId();
    const newId = getIdRes.payload;

    let newUrl;
    if (env.BASE_URL.length) {
      newUrl = `${env.BASE_URL}/${this.state.selectedAnnotation}/result/${newId}`;
    } else {
      newUrl = `/${this.state.selectedAnnotation}/result/${newId}`;
    }

    const annotationDict = {
      tissue: 'Tissue Expression',
      kegg: 'KEGG Pathway',
      gene: 'Gene Ontology',
      local: 'Localization'
    }

    this.setState({
      resultId: newId,
      resultUrls: [...this.state.resultUrls, {url: newUrl, type: annotationDict[this.state.selectedAnnotation]}]
    });

    const postBody = {
      pathogenProteins: this.state.selectedPatProteins,
      pathogen: this.state.selectedVirus,
      genes: this.state.genes.replace(/ \s+/g, '').trim().split(','),
      interactionType: this.state.selectedIntTypes,
      interactionCategory: this.state.interactionCategory,
      tissues: tissues,
      expId: newId
    };

    let responseData;

    if (this.state.selectedAnnotation === 'tissue') {
      responseData = await ExpressionService.getTissueExpressions(postBody);
    } else if (this.state.selectedAnnotation === 'gene') {
      postBody['goTerms'] = this.state.selectedGoTerms;
      postBody.tissues = [];
      responseData = await GoService.getGoEnrichments(postBody);
    } else if (this.state.selectedAnnotation === 'kegg') {
      postBody.tissues = [];
      responseData = await KeggService.getKeggEnrichments(postBody);
    }

    this.setState({interactionLoading: false});
    this.setState(state => {
      return {
        displayedResults: this.state.selectedAnnotation,
        results: responseData,
        showControls: false,
        height: 0
      }
    });

    console.log(postBody);
  }

  closeTissueModal(selectedTissues) {
    this.setState({showTissueModal: false, selectedTissues: selectedTissues});
  }

  fileSelected(fileText) {
    this.setState({genes: fileText});
  }

  setGeneHint(hint) {
    this.setState({geneHintOn: hint});
  }


  render() {
    let geneHintClass = 'gene-hint';

    let genePlaceholder = 'Example: NR3C1, NR1I2, ANXA1';
    let geneSample = 'PTPRR, PTPN2, PTPN7, PTPN20, PTPN5';

    if (this.state.selectedAnnotation === 'kegg') {
      genePlaceholder = 'Example: 10376, 1000, 6714';
      geneSample = '5605, 1564, 2946, 116444';
    }

    if (this.state.geneHintOn) {
      geneHintClass = 'gene-hint active';
    }

    const height = this.state.height;

    let interactionButton;

    if (this.state.interactionLoading) {
      interactionButton = (<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>);
    } else {
      interactionButton = (<Button className="kbl-btn-1 px-5" onClick={(e) => {
          this.showInteractionsClicked();
        }}>Show Interactions
      </Button>);
    }

    let protChips = this.state.selectedPatProteins.map(protein => (
      <HChip text={protein} key={protein} ch={this.patProtClicked}/>
    ));

    this.searchOptions = PATHOGEN_PROTEINS.filter(protein => {
      if (!this.state.selectedPatProteins.includes(protein)) {
        return true;
      }

      return false;
    })
    .map(protein => {
      return {name: protein, value: protein};
    });

    let containerClass = "px-0 pt-5 t-3";

    if (!this.state.showControls) {
      containerClass = "px-0 pt-5 t-3 o-0";
    }

    let newButton = <div></div>

    if (!this.state.showControls) {
      newButton = (<Button className="kbl-btn-1 px-5 my-4" onClick={(e) => {
          this.setState({height: 'auto', showControls: true})
        }}>Search Again
      </Button>)
    }

    let noProteinMsg = <div></div>;

    if (!this.state.selectedPatProteins.length) {
      noProteinMsg = (
        <Row className="mt-3">
          <Col sm={12} className="text-center">
            <p>
              No pathogen proteins selected
            </p>
          </Col>
        </Row>);
    }

    console.log(this.searchOptions);

    let resultUrlComponent;

    if (this.state.resultUrls.length) {
      resultUrlComponent = Array.from(this.state.resultUrls).map((urlObj, index) => (
        <ResultCard  type={urlObj.type} url={urlObj.url} name={`Result ${index + 1}`} />

      ));
    }

    let selectGo = <div></div>;

    if (this.state.selectedAnnotation === 'gene') {
      selectGo = (
        <div className="mt-3">
          <div className="pl-2"><b>Select GO terms:</b></div>
          <HSelector multi={true} text="Molecular Function" name='molecfunction' selected={this.isGoTermSelected('molecfunction')} ch={this.selectGoTerm}/>
          <HSelector multi={true} text="Cellular Component" name='cellcomp' selected={this.isGoTermSelected('cellcomp')} ch={this.selectGoTerm}/>
          <HSelector multi={true} text="Biological Process" name='biopathway' selected={this.isGoTermSelected('biopathway')} ch={this.selectGoTerm}/>
        </div>
      )
    }

    return (
      <div>
        <AnimateHeight duration={400} height={height}>
          <Container className={containerClass}>
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
                    <div className={geneHintClass + " pl-2 pb-2"}>Enter genes or gene IDs here.</div>
                    <Form.Control className="kbl-form mb-4" as="textarea" rows={5} placeholder={genePlaceholder} onChange={ this.handleGeneChange }
                      value={this.state.genes} onMouseEnter={() => this.setGeneHint(true)} onMouseLeave={() => this.setGeneHint(false)}/>
                    <Button className="kbl-btn-1 mr-3" onClick={e => {
                        this.setState({genes: geneSample});
                      }}>Sample Data</Button>
                    <Button className="kbl-btn-2" onClick={e => {
                        this.setState({genes: ""})
                      }}>Clear Data</Button>

                    <h6 className="mt-5 pl-2"><b>File Upload</b></h6>

                    <FileInput handler={this.fileSelected} />

                    <h5 className="pl-2"><b>Annotation Type</b></h5>
                    <div className="px-0"><div className="line mt-2 mb-3"></div></div>

                    <HSelector text="Tissue Expression" selected={this.isAnnotationSelected('tissue')} name="tissue" ch={this.selectAnnotation}/>
                    <HSelector text="Localization" selected={this.isAnnotationSelected('local')} name="local" ch={this.selectAnnotation}/>
                    <HSelector text="KEGG Pathway" selected={this.isAnnotationSelected('kegg')} name="kegg" ch={this.selectAnnotation}/>
                    <HSelector text="Gene Ontology" selected={this.isAnnotationSelected('gene')} name="gene" ch={this.selectAnnotation}/>
                  </Col>
                  <Col sm={12}>
                    {selectGo}
                  </Col>
                </Row>

                <Row className="pt-4">
                  <Col sm={12}>
                    <Button className="kbl-btn-1 mr-3" onClick={e => {
                        this.setState({showTissueModal: true});
                      }}>Select Annotation Terms</Button>
                  </Col>
                </Row>
              </Col>

              <Col sm={6} className="px-4">
                <Row>
                  <Col sm={6} className="text-left">
                    <h6><b>Virus</b></h6>

                    <HSelector text="SARS-CoV-2" selected={this.isVirusSelected('sars-cov-2')} name="sars-cov-2" ch={this.selectVirus}/><br/>
                    <HSelector text="SARS-CoV" selected={this.isVirusSelected('sars-cov-1')} name="sars-cov-1" ch={this.selectVirus}/><br/>
                    <HSelector text="MERS" selected={this.isVirusSelected('mers')} name="mers" ch={this.selectVirus}/><br/>
                  </Col>
                  <Col sm={6} className="text-left">
                    <h6><b>Interaction Category</b></h6>

                    <HSelector text="Unique" selected={this.isCategorySelected('unique')} name="unique" ch={this.selectIntCategory}/><br/>
                    <HSelector text="Common" selected={this.isCategorySelected('common')} name="common" ch={this.selectIntCategory}/><br/>
                    <HSelector text="Both" selected={this.isCategorySelected('both')} name="both" ch={this.selectIntCategory}/><br/>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col className="text-left">
                    <h6><b>Interaction Type</b></h6>
                    <HSelector multi={true} text="Interolog" name='interolog' selected={this.isIntTypeSelected('interolog')} ch={this.selectIntType}/>
                    <HSelector multi={true} text="Domain" name='domain' selected={this.isIntTypeSelected('domain')} ch={this.selectIntType}/>
                    <HSelector multi={true} text="Consensus" name='both' selected={this.isIntTypeSelected('both')} ch={this.selectIntType}/>
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

                    {noProteinMsg}

                    <Row className="mt-3 justify-content-center">
                      <Col sm={12}>
                        {protChips}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="mt-5 mb-5">
              <Col>
                {interactionButton}
              </Col>
            </Row>
          </Container>
        </AnimateHeight>

        <Row className="mb-4 mt-2 px-5">
          {resultUrlComponent}
        </Row>

        {newButton}

        <TissueModal tissues={this.state.tissueOptions} show={this.state.showTissueModal} handler={this.closeTissueModal}/>
      </div>
    );
  }
}
