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
    'pathogen',
    'isolate',
    'pathogenProtein',
    'pLength',
    'gene',
    'hLength',
    'goId',
    'description',
    'interactionType',
    'interactionCategory'
  ];


  let results;

  if (goData.payload && goData.payload.reqTime) {
    goData.payload.results = goData.payload.results.filter(result => {
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
            <th>GO ID</th>
            <th>Description</th>
            <th>Type</th>
            <th>Category</th>
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
