import React, { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './VisPage.scss';

import { Visualization } from 'components/Visualization/Visualization';
import { VisTable } from 'components/VisTable/VisTable';
import { NodeMenu } from 'components/NodeMenu/NodeMenu';
import { EdgeMenu } from 'components/EdgeMenu/EdgeMenu';

const NodeTypeDict = {
  'host': 'Host',
  'pat': 'Pathogen Protein'
}

export class VisPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedBar: 'table',
      currentNodeData: {},
      currentEdgeData: {},
      searchTerm: '',
      infoType: ''
    };

    this.handleNodeClicked = this.handleNodeClicked.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.handleEdgeClicked = this.handleEdgeClicked.bind(this);
  }

  handleBarSwitch(newMenu) {
    this.setState({selectedBar: newMenu});
  }

  setSearchTerm(term) {
    this.setState({searchTerm: term});
  }

  handleNodeClicked(data) {
    console.log(data);
    this.setState({infoType: 'Node '});

    let nodeType = NodeTypeDict[data.className];
    let itemName = data.id;

    let parsedData = {
      nodeType,
      name: itemName
    }
    this.setState({currentNodeData: parsedData}, () => {
      this.handleBarSwitch('info');
    });
  }

  handleEdgeClicked(data) {
    this.setState({infoType: 'Edge '});
    this.handleBarSwitch('info');
  }

  render() {
    let tableClass = '';
    let nodeClass = '';

    if (this.state.selectedBar === 'table') {
      tableClass = 'selected';
    } else {
      nodeClass = 'selected';
    }

    let menuComponent;

    if (this.state.selectedBar === 'table') {
      menuComponent = <VisTable handleSearchChange={this.setSearchTerm} />
    } else {
      if (this.state.infoType.trim().toLowerCase() === 'node') {
        menuComponent = <NodeMenu nodeData={this.state.currentNodeData} />
      } else if (this.state.infoType.trim().toLowerCase() === 'edge') {
        menuComponent = <EdgeMenu />
      } else {
        menuComponent = (<div>No node or edge selected.</div>)
      }

    }

    return (
      <Row>
        <Col sm={7}>
          <Visualization edgeHandler={this.handleEdgeClicked} nodeHandler={this.handleNodeClicked} searchTerm={this.state.searchTerm} />
        </Col>
        <Col sm={5}>
          <div className="bar-selector mb-3">
            <span className={`${tableClass} mr-3`} onClick={() => this.handleBarSwitch('table')}>Table</span>
            <span className={nodeClass}  onClick={() => this.handleBarSwitch('info')}>{this.state.infoType}Info</span>
          </div>
          {menuComponent}
        </Col>
      </Row>
    );
  }
}
