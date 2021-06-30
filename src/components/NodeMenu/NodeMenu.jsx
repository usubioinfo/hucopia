import React, { Component } from 'react';

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

    return (
      <div className="node-menu-container">

      </div>
    );
  }
}
