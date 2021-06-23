import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as ResultService from 'services/result.service';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { env } from 'env.js';

export const KeggResultsTable = () => {
  const { id } = useParams();

  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await ResultService.getResultById(id);
      setData(results);
    }

    fetchData();
  }, []);

  const keggProperties = [
    'pathogen',
    'isolate',
    'pathogenProtein',
    'pLength',
    'gene',
    'hLength',
    'keggId',
    'description',
    'interactionType',
    'interactionCategory'
  ];

  let results;

  if (data.payload && data.payload.reqTime) {
    data.payload.results = data.payload.results.filter(result => {
      return result.interactionType.length;
    });

    results = (
      <Table responsive className="kbl-table table-borderless">
        <thead className="kbl-thead">
          <tr className="top">
            <th></th>
            <th colSpan="4" className="pathogen">Pathogen</th>
            <th colSpan="4" className="human">Human</th>
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
            <th>KEGG ID</th>
            <th>Description</th>
            <th>Type</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {Array.from(data.payload.results).map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Array.from(keggProperties).map((_, index) => (
                <td>{result[keggProperties[index]]}</td>
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
