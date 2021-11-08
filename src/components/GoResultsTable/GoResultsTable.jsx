import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as ResultService from 'services/result.service';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

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

  let [searchTerm, setSearchTerm] = useState('');
  let [goData, setGoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await ResultService.getResultById(id);
      setGoData(results);
    }

    fetchData();
  }, []);


  let results;
  let summary;

  if (goData.payload && goData.payload.reqTime) {
    let tableResults = goData.payload.results;

    if (searchTerm !== '') {
      tableResults = goData.payload.results.filter(item => {
        for (let key in item) {
          if (String(item[key]).toLowerCase().includes(searchTerm)) {
            return true;
          }
        }

        return false;
      });
    }

    goData.payload.results = goData.payload.results.filter(result => {
      return result.interactionType.length;
    });

    const genes = tableResults.map(item => {
      return item.gene;
    });

    const patProteins = tableResults.map(item => {
      return item.pathogenProtein;
    });

    const numGenes = new Set(genes);
    const numPatProteins = new Set(patProteins);

    summary = `Interactions: ${tableResults.length}, Genes: ${numGenes.size}, Pathogen Proteins: ${numPatProteins.size}`;

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
          {Array.from(tableResults).map((result, index) => (
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
      <Row className="my-3 justify-content-right">
        <Col sm={'auto'} className="text-left px-4">
          <a href={newUrl} target="_blank" rel="noreferrer noopener">
            <Button className="kbl-btn-1">Network Visualization</Button>
          </a>
        </Col>
        <Col sm={6}>
          <Form.Control className="kbl-form" type="email" placeholder="Search" value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }
            }/>
        </Col>
      </Row>

      <Row>
        <Col className="text-left px-4">
          {summary}
        </Col>
      </Row>

      <div className="mb-3">
        {results}
      </div>

      <div className="text-left">
        *Reference isolate referes to all 30 genomes
      </div>
    </div>
  );
}
