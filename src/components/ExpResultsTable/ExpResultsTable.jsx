import { useState, useEffect } from 'react';

import * as ResultService from 'services/result.service';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './ExpResultsTable.scss';

import { useParams } from 'react-router-dom';

import { env } from 'env.js';

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

const generateComponent = (property, data) => {
  if (property === 'gene') {
    return <td><a href={`https://gtexportal.org/home/gene/${data}`} target="_blank" rel="noreferrer">{data}</a></td>
  } else if (property === 'pathogenProtein') {
    const link = `https://www.ncbi.nlm.nih.gov/protein/?term=${data}`;
    return <td><a href={link} target="_blank" rel="noreferrer">{data}</a></td>
  } else {
    return <td>{data}</td>
  }
}

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

  let results;

  if (data.payload && data.payload.reqTime) {
    const mappedResults = data.payload.results.map((item, index) => {
      console.log(properties[index]);
    });

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
            <th>H-length</th>
            <th>Tissue</th>
            <th>Type</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {Array.from(data.payload.results).map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Array.from(properties).map((_, index) => (
                generateComponent(properties[index], result[properties[index]])
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

  let newUrl;
  if (env.BASE_URL.length) {
    newUrl = `${env.BASE_URL}/vis/${id}`;
  } else {
    newUrl = `/vis/${id}`;
  }

  return (
    <div>
      <div className="my-3">
        <a href={newUrl} target="_blank" rel="noreferrer noopener">
          <Button className="kbl-btn-1">Visualization</Button>
        </a>
      </div>
      <div className="mb-5">
        {results}
      </div>
    </div>
  );
}
