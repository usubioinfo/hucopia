import { useState, useEffect } from 'react';

import * as ResultService from 'services/result.service';
import * as CSVService from 'services/csvdownload.service';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './ExpResultsTable.scss';

import { useParams } from 'react-router-dom';

import { env } from 'env.js';

const isolateDict = {
  reference: '1798174254',
  australia: 'MT007544.1',
  brazil: 'MT126808.1',
  'china_Beijing': 'MT291836.1',
  'china_hw': 'MT019532.1',
  'china_ref': 'NC_045512.2',
  'china_Shanghai': 'MT121215.1',
  colombia: 'MT256924.2',
  'diamond_p': 'LC528233.1',
  france: 'MT320538.2',
  greece: 'MT328035.1',
  hongkong: 'MT114419.1',
  india: 'MT050493.1',
  iran: 'MT320891.2',
  israel: 'MT276598.1',
  italy: 'MT077125.1',
  japan: 'LC534419.1',
  nepal: 'MT072688.1',
  pakistan: 'MT240479.1',
  peru: 'MT263074.1',
  's_korea': 'MT304476.1',
  'south_africa': 'MT324062.1',
  spain: 'MT359866.1',
  sweden: 'MT093571.1',
  taiwan: 'MT066176.1',
  turkey: 'MT327745.1',
  'usa-ca': 'MT276324.1',
  'usa-ny': 'MT325627.1',
  'usa-ut': 'MT334561.1',
  'usa-wa': 'MT358644.1',
  vietnam: 'MT192773.1'
}

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

const shadingGuide = {
  pathogen: 'light',
  isolate: 'light',
  pathogenProtein: 'light',
  pLength: 'light',
  gene: 'dark',
  hLength: 'dark',
  tissueExpression: 'dark',
  interactionType: 'light',
  interactionCategory: 'light'
}

const generateComponent = (property, data, result) => {
  const shading = shadingGuide[property];

  if (property === 'gene') {
    return <td className={shading}><a href={`https://www.ncbi.nlm.nih.gov/gene/?term=${data}+AND+human`} target="_blank" rel="noreferrer">{data}</a></td>
  } else if (property === 'pathogenProtein') {
    const link = `https://www.ncbi.nlm.nih.gov/protein/?term=${data}`;
    return <td className={shading}><a href={link} target="_blank" rel="noreferrer">{data}</a></td>
  } else if (property === 'tissueExpression') {
    return <td className={shading}><a href={`https://gtexportal.org/home/gene/${result['gene']}`} target="_blank" rel="noreferrer">{data}</a></td>
  } else if (property === 'isolate') {
    return <td className={shading}><a href={`https://www.ncbi.nlm.nih.gov/nuccore/${isolateDict[data]}`} target="_blank" rel="noreferrer">{data}</a></td>
  } else {
    return <td className={shading}>{data}</td>
  }
}

export const ExpResultsTable = () => {
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

  let csvButton = <div></div>;

  if (data.payload && data.payload.reqTime) {
    csvButton = <Button className="kbl-btn-1" onClick={CSVService.downloadCsv(tableResults)}>CSV</Button>;
    let tableResults = data.payload.results;
    console.log(tableResults);

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
      <Table responsive className="kbl-table exp table-borderless">
        <thead className="kbl-thead">
          <tr className="top">
            <th></th>
            <th colSpan="4" className="pathogen">Pathogen</th>
            <th colSpan="3" className="human">Human</th>
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
            <th className="dark">Tissue</th>
            <th className="light">Type</th>
            <th className="light">Category</th>
          </tr>
        </thead>

        <tbody>
          {Array.from(tableResults).map((result, index) => (
            <tr key={index}>
              <td className="light">{index + 1}</td>
              {Array.from(properties).map((_, index) => (
                generateComponent(properties[index], result[properties[index]], result)
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
    );

    summary = 'Loading...';
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

          
          {csvButton}



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
      <div className="mb-3">
        {results}
      </div>

      <div className="text-left">
        *Reference isolate refers to all 30 genomes, found <a href={`${env.BASE_URL}/dataset`} target="_blank" rel="noreferrer">here</a>
      </div>
    </div>
  );
}
