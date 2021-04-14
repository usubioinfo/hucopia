import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as ResultService from 'services/result.service';

import Table from 'react-bootstrap/Table';

export const KeggResultsTable = () => {
  const { id } = useParams();

  let [intData, setIntData] = useState([]);
  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await ResultService.getResultById(id);
      setData(results);
    }

    fetchData();
  }, []);

  const keggProperties = [
    'keggId',
    'description',
    'geneRatio',
    'bgRatio',
    'pathogen'
  ];

  const intProperties = [
    'pathogen',
    'isolate',
    'pathogenProtein',
    'pLength',
    'gene',
    'hLength',
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
            <th colspan="6" className="pathogen">KEGG Enrichment</th>
          </tr>

          <tr className="bottom">
            <th>#</th>
            <th>KEGG ID</th>
            <th>Description</th>
            <th>Gene Ratio</th>
            <th>BG Ratio</th>
            <th>Pathogen</th>
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

  return (
    <div className="mb-5">
      {results}
    </div>
  );
}
