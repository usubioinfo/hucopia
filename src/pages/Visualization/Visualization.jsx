import React, { Component } from 'react';
import cytoscape from 'cytoscape';

import './Visualization.scss';

export class Visualization extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    let cy = cytoscape({
      container: document.getElementById('cy')
    });
  }

  render() {
    return (
      <div id='cy'></div>
    );
  }
}
