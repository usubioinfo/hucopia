import React, { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './VisPage.scss';

import { Visualization } from 'components/Visualization/Visualization';
import { VisTable } from 'components/VisTable/VisTable';
import { NodeMenu } from 'components/NodeMenu/NodeMenu';

const NodeTypeDict = {
  'host': 'Host',
  'pat': 'Pathogen Protein'
}

export class VisPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedBar: 'table',
      currentNodeData: {}
    };

    this.handleNodeClicked = this.handleNodeClicked.bind(this);
  }

  handleBarSwitch(newMenu) {
    this.setState({selectedBar: newMenu});
  }

  handleNodeClicked(data) {
    console.log(data);

    let nodeType = NodeTypeDict[data.className];
    let itemName = data.id;

    let parsedData = {
      nodeType,
      name: itemName
    }
    this.setState({currentNodeData: parsedData}, () => {
      this.handleBarSwitch('node');
    });
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
      menuComponent = <VisTable />
    } else {
      menuComponent = <NodeMenu nodeData={this.state.currentNodeData} />
    }

    return (
      <Row>
        <Col sm={7}>
          <Visualization nodeHandler={this.handleNodeClicked} />
        </Col>
        <Col sm={5}>
          <div className="bar-selector mb-3">
            <span className={tableClass} onClick={() => this.handleBarSwitch('table')}>Table</span>
            <span className={nodeClass}  onClick={() => this.handleBarSwitch('node')}>Node Info</span>
          </div>
          {menuComponent}
        </Col>
      </Row>
    );
  }
}
