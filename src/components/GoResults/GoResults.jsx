import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Table from 'react-bootstrap/Table';

class GoResults extends Component {

  properties;

  constructor(props) {
    super(props);

    console.log(this.props.results);

    this.properties = [
      'pathogen',
      'isolate',
      'pathogenProtein',
      'pLength',
      'gene',
      'tissueExpression',
      'hLength',
      'interactionType',
      'interactionCategory'
    ];

    this.goProperties = [
      'goId',
      'category',
      'description',
      'geneRatio',
      'bgRatio',
      'pathogen'
    ];
  }

  render() {
    console.log(this.props.results.payload);
    return (
      <div className="mb-5">
        <Table responsive className="kbl-table table-borderless">
          <thead className="kbl-thead">
            <tr className="top">
              <th></th>
              <th colspan="7" className="pathogen">GO Enrichment</th>
            </tr>

            <tr className="bottom">
              <th>#</th>
              <th>GO ID</th>
              <th>Category</th>
              <th>Description</th>
              <th>Gene Ratio</th>
              <th>BG Ratio</th>
              <th>Pathogen</th>
            </tr>
          </thead>

          <tbody>
            {Array.from(this.props.results.payload.enrichments).map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {Array.from(this.goProperties).map((_, index) => (
                  <td>{result[this.goProperties[index]]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(GoResults);
