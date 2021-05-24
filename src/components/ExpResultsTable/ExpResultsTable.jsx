import { useState, useEffect } from 'react';

import * as ResultService from 'services/result.service';

import Table from 'react-bootstrap/Table';
import './ExpResultsTable.scss';

import { useParams } from 'react-router-dom';

export const ExpResultsTable = () => {
  const { id } = useParams();

  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await ResultService.getResultById(id);
      setData(results);
    }

    fetchData();
  }, []);

  const properties = [
    'pathogen',
    'isolate',
    'pathogenProtein',
    'pLength',
    'gene',
    'hLength',
    'tissueExpression',
    'interactionType',
    'interactionCategory'
  ];

  let results;

  if (data.payload && data.payload.reqTime) {
    results = (
      <Table responsive className="kbl-table table-borderless">
        <thead className="kbl-thead">
          <tr className="top">
            <th></th>
            <th colSpan="4" className="pathogen">Pathogen</th>
            <th colSpan="3" className="human">Human</th>
            <th colSpan="2" className="interaction">Interaction</th>
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
            <th>Type</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {Array.from(data.payload.results).map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Array.from(properties).map((_, index) => (
                <td>{result[properties[index]]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  } else {
    results = (
      <div>
        Your query is still running! Check back later.
      </div>
    )
  }

  return (
    <div className="mb-5">
      {results}
    </div>
  );
}
