import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as ResultService from 'services/result.service';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { env } from 'env.js';

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

const generateComponent = (property, data) => {
  if (property === 'goId') {
    const link = `http://amigo.geneontology.org/amigo/search/ontology?q=${data}`;
    return <td><a href={link} target="_blank" rel="noreferrer">{data}</a></td>
  } else if (property === 'pathogenProtein') {
    const link = `https://www.ncbi.nlm.nih.gov/protein/?term=${data}`;
    return <td><a href={link} target="_blank" rel="noreferrer">{data}</a></td>
  } else {
    return <td>{data}</td>
  }
}

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
            <th className="light">#</th>
            <th className="light">Pathogen</th>
            <th className="light">Isolate</th>
            <th className="light">Protein</th>
            <th className="light">P-length</th>
            <th className="dark">Gene</th>
            <th className="dark">H-length</th>
            <th className="dark">GO ID</th>
            <th className="dark">Description</th>
            <th className="light">Type</th>
            <th className="light">Category</th>
          </tr>
        </thead>

        <tbody>
          {Array.from(goData.payload.results).map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Array.from(goProperties).map((_, index) => (
                generateComponent(goProperties[index], result[goProperties[index]])
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
