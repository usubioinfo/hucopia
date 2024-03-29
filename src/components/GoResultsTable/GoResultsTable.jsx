import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as ResultService from 'services/result.service';
import * as CSVService from 'services/csvdownload.service';

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
  'humanProtein',
  'gene',
  'hLength',
  'goId',
  'description',
  'fdr',
  'pInteractor',
  'hInteractor',
  'confidence',
  'intdb',
  'interactionType',
  'interactionCategory',
  'publication'
  
];

const shadingGuide = {
  pathogen: 'light',
  isolate: 'light',
  pathogenProtein: 'light',
  pLength: 'light',
  humanProtein: 'dark',
  gene: 'dark',
  hLength: 'dark',
  goId: 'dark',
  description: 'dark',
  fdr: 'dark',
  pInteractor: 'light',
  hInteractor:'light',
  confidence: 'light',
  intdb: 'light',
  interactionType: 'light',
  interactionCategory: 'light',
  publication: 'light'
}

const generateComponent = (property, data) => {
  const shading = shadingGuide[property];

  if (property === 'goId') {
    const link = `http://amigo.geneontology.org/amigo/search/ontology?q=${data}`;
    return <td className={shading}><a href={link} target="_blank" rel="noreferrer">{data}</a></td>
  } else if (property === 'pathogenProtein') {
    const link = `https://www.ncbi.nlm.nih.gov/protein/?term=${data}`;
    return <td className={shading}><a href={link} target="_blank" rel="noreferrer">{data}</a></td>
  }else if (property === 'humanProtein') {
    const link = `https://www.uniprot.org/uniprotkb/${data}`;
    return <td className={shading}><a href={link} target="_blank" rel="noreferrer">{data}</a></td>
  }
  else if (property === 'gene') {
    const link = `https://www.uniprot.org/uniprotkb?query=${data}_HUMAN`;
    return <td className={shading}><a href={link} target="_blank" rel="noreferrer">{data}</a></td>
  } else if (property === 'pInteractor') {
    const link = `https://www.uniprot.org/uniprotkb/${data}`;
    return <td className={shading}><a href={link} target="_blank" rel="noreferrer">{data}</a></td>
  }else if (property === 'hInteractor') {
    const link = `https://www.uniprot.org/uniprotkb/${data}`;
    return <td className={shading}><a href={link} target="_blank" rel="noreferrer">{data}</a></td>
  }
  else if (property === 'publication') {
    let link;
    if (data){
   
    if (data.includes("/")){
      link = `https://doi.org/${data}`;
    }
    else if (data.includes("888800")){
      link = `https://wiki.thebiogrid.org/doku.php/covid:unpublished`;
    }
    else{
      link = `https://pubmed.ncbi.nlm.nih.gov/?term=${data}`;
    }
  }
    return <td className={shading}><a href={link} target="_blank" rel="noreferrer">{data}</a></td>
  }
 
  else {
    return <td className={shading}>{data}</td>
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

  let csvButton = <div></div>;

  if (goData.payload && goData.payload.reqTime) {
    csvButton = <Button className="kbl-btn-1 mx-2" onClick={() => CSVService.downloadCsv(tableResults, "go")}>CSV</Button>;
    let tableResults = goData.payload.results;
    // console.log(tableResults);
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
      <Table responsive className="kbl-table go table-borderless">
        <thead className="kbl-thead">
          <tr className="top">
            <th></th>
            <th colSpan="4" className="pathogen">Pathogen</th>
            <th colSpan="6" className="human">Human</th>
            <th colSpan="6" className="interaction">Interaction</th>
          </tr>

          <tr className="bottom">
            <th className="light">#</th>
            <th className="light">Pathogen</th>
            <th className="light">Isolate</th>
            <th className="light">Protein</th>
            <th className="light">P-length</th>
            <th className="dark">H-Protein</th>
            <th className="dark">Gene</th>
            <th className="dark">H-length</th>
            <th className="dark">GO ID</th>
            <th className="dark">Description</th>
            <th className="dark">FDR</th>
            <th className="light">P-Interactor</th>
            <th className="light">H-Interactor</th>
            <th className="light">Confidence</th>
            <th className='light'>Interaction DB</th>
            <th className="light">Type</th>
            <th className="light">Category</th>
            <th className="light">Publication</th>
            </tr>
        </thead>

        <tbody>
          {Array.from(tableResults).map((result, index) => (
            <tr key={index}>
              <td className="light">{index + 1}</td>
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
      <div className="text-left">
        *All Interolog are filtered with Identity <code>&ge;40</code>, Coverage <code>&le;80</code> and e-value <code>&le;1e-50</code><br></br>
        *All human domain are filtered with <code>0.2 Coverage</code> and <code>1e-23 E-value</code> and Virus domain are filtered with <code> 1e-1 E-value </code> an default coverage.
      </div>
    </div>
  );
}
