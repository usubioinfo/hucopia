import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Table from 'react-bootstrap/Table';

class TissueResults extends Component {

  properties;

  constructor(props) {
    super(props);

    console.log(this.props.results);

    this.properties = [
      'pathogen',
      'gene',
      'interactionCategory',
      'interactionType',
      'isolate',
      'tissueExpression',
      'pathogenProtein',
      'hLength',
      'pLength'
    ];
  }

  render() {
    console.log(this.props.results.payload);
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Pathogen</th>
              <th>Gene</th>
              <th>Int. Category</th>
              <th>Int. Type</th>
              <th>Isolate</th>
              <th>Tissue</th>
              <th>Protein</th>
              <th>H-length</th>
              <th>P-length</th>
            </tr>
          </thead>

          <tbody>
            {Array.from(this.props.results.payload).map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {Array.from(this.properties).map((_, index) => (
                  <td>{result[this.properties[index]]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(TissueResults);
