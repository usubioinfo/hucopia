import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as ResultService from 'services/result.service';

import Table from 'react-bootstrap/Table';

export const GoResultsTable = () => {
  const { id } = useParams();

  let [intData, setIntData] = useState([]);
  let [goData, setGoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await ResultService.getResultById(id);
      setGoData(results);
    }

    fetchData();
  }, []);

  const goProperties = [
    'goId',
    'category',
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

  if (goData.payload && goData.payload.reqTime) {
    results = (
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
          {Array.from(goData.payload.results).map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Array.from(goProperties).map((_, index) => (
                <td>{result[goProperties[index]]}</td>
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
