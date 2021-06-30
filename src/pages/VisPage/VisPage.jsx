import React, { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './VisPage.scss';

import { Visualization } from 'components/Visualization/Visualization';
import { VisTable } from 'components/VisTable/VisTable';

export class VisPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedBar: 'table'
    };
  }

  handleBarSwitch(newMenu) {
    this.setState({selectedBar: newMenu});
  }

  render() {
    let tableClass = '';
    let nodeClass = '';

    if (this.state.selectedBar === 'table') {
      tableClass = 'selected';
    } else {
      nodeClass = 'selected';
    }

    return (
      <Row>
        <Col sm={7}>
          <Visualization/>
        </Col>
        <Col sm={5}>
          <div className="bar-selector mb-2">
            <span className={tableClass} onClick={() => this.handleBarSwitch('table')}>Table</span>
            <span className={nodeClass}  onClick={() => this.handleBarSwitch('node')}>Node Info</span>
          </div>
          <VisTable/>
        </Col>
      </Row>
    );
  }
}
