import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as ResultService from 'services/result.service';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { env } from 'env.js';

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

const shadingGuide = {
  pathogen: 'light',
  isolate: 'light',
  pathogenProtein: 'light',
  pLength: 'light',
  gene: 'dark',
  hLength: 'dark',
  keggId: 'dark',
  description: 'dark',
  interactionType: 'light',
  interactionCategory: 'light'
}

const generateComponent = (property, data) => {
  const shading = shadingGuide[property];

  if (property === 'keggId') {
    const link = `https://www.genome.jp/pathway/${data}`;
    return <td className={shading}><a href={link} target="_blank" rel="noreferrer">{data}</a></td>
  } else if (property === 'pathogenProtein') {
    const link = `https://www.ncbi.nlm.nih.gov/protein/?term=${data}`;
    return <td className={shading}><a href={link} target="_blank" rel="noreferrer">{data}</a></td>
  } else {
    return <td className={shading}>{data}</td>
  }
}

export const KeggResultsTable = () => {
  const { id } = useParams();

  let [data, setData] = useState([]);
  let [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const results = await ResultService.getResultById(id);
      setData(results);
    }

    fetchData();
  }, []);

  let results;
  let summary;

  if (data.payload && data.payload.reqTime) {
    let tableResults = data.payload.results;

    if (searchTerm !== '') {
      tableResults = data.payload.results.filter(item => {
        for (let key in item) {
          if (String(item[key]).toLowerCase().includes(searchTerm)) {
            return true;
          }
        }

        return false;
      });
    }

    console.log(data.payload.results);

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
      <Table responsive className="kbl-table kegg table-borderless">
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
            <th className="dark">KEGG ID</th>
            <th className="dark">Description</th>
            <th className="light">Type</th>
            <th className="light">Category</th>
          </tr>
        </thead>

        <tbody>
          {Array.from(tableResults).map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Array.from(keggProperties).map((_, index) => (
                generateComponent(keggProperties[index], result[keggProperties[index]])
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
        <Col className="text-left px-4 mb-2">
          {summary}
        </Col>
      </Row>

      <div className="mb-2">
        {results}
      </div>

      <div className="text-left">
        *Reference isolate refers to all 30 genomes, found <a href={`${env.BASE_URL}/dataset`} target="_blank" rel="noreferrer">here</a>
      </div>
    </div>
  );
}
