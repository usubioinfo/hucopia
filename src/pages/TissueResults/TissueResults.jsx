import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Table from 'react-bootstrap/Table';
import './TissueResults.scss';

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
      <div className="mb-5">
        <Table responsive className="kbl-table table-borderless">
          <thead className="kbl-thead">
            <tr class="top">
              <th></th>
              <th colspan="4" className="pathogen">Pathogen</th>
              <th colspan="3" className="human">Human</th>
              <th colspan="2" className="interaction">Interaction</th>
            </tr>

            <tr className="bottom">
              <th>#</th>
              <th>Pathogen</th>
              <th>Isolate</th>
              <th>Protein</th>
              <th>P-length</th>
              <th>Gene</th>
              <th>Tissue</th>
              <th>H-length</th>
              <th>Int. Type</th>
              <th>Int. Category</th>
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
