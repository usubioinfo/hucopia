import { useState, useEffect } from 'react';

import axios from 'axios';
import { env } from 'env.js';

import Table from 'react-bootstrap/Table';
import './ResultsTable.scss';

import { useParams } from 'react-router-dom';

export const ResultsTable = () => {
  const { id } = useParams();

  let [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${env.BACKEND}/expression/result/${id}`)
      .then(res => {
        setData(res.data.payload.expressions)
        console.log(res.data);
        data.current = res.data.payload.expressions;
        console.log(data);
      });
  }, []);

  const properties = [
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

  return (
    <div className="mb-5">
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
            <th>Int. Type</th>
            <th>Int. Category</th>
          </tr>
        </thead>

        <tbody>
          {Array.from(data).map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Array.from(properties).map((_, index) => (
                <td>{result[properties[index]]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
