import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './NodeMenu.scss';

export class NodeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    if (Object.keys(this.props.nodeData).length === 0) {
      return (<div>No node selected</div>);
    }

    let type = 'Host Gene';
    let ncbiLink = `https://www.ncbi.nlm.nih.gov/?term=${this.props.nodeData.name.toLowerCase()}`;
    let uniLink = `https://www.uniprot.org/uniprot/?query=${this.props.nodeData.name.toLowerCase()}&fil=organism:%22Homo+sapiens+(Human)+%5B9606%5D%22&sort=score`;

    if (this.props.nodeData.nodeType === 'Pathogen Protein') {
      type = 'Pathogen Protein';

      ncbiLink = `https://www.ncbi.nlm.nih.gov/protein/?term=${this.props.nodeData.name.toLowerCase()}`;
    }

    return (
      <div>
        <div className="node-menu-container text-left px-3 pt-2 pb-4">
          <h6 className="node-type">{type}</h6>
          <h3 className="node-name"><b>{this.props.nodeData.name}</b></h3>
          <Row>
            <Col>
              <a href={uniLink} className="link mr-2">
                Uniprot
              </a>
              |
              <a href={ncbiLink} className="link ml-2">
                NCBI
              </a>
            </Col>
          </Row>
        </div>

        <Row>
          <Col>
            
          </Col>
        </Row>
      </div>
    );
  }
}
