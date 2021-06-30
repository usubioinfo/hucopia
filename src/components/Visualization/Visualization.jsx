import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import cb from 'cytoscape-cose-bilkent';
import CyComp from 'react-cytoscapejs';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IconContext } from 'react-icons';
import { FaImage } from 'react-icons/fa'

import FileSaver from 'file-saver';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import * as ResultService from 'services/result.service';

import './Visualization.scss';

cytoscape.use(cb);

let cyRef;

export const Visualization = () => {

  const { id } = useParams();
  let [data, setData] = useState([]);

  let layout = {
    name: 'cose'
  }

  useEffect(() => {
    const fetchData = async () => {
      const results = await ResultService.getResultById(id);

      setData(results);
    }

    fetchData();
  }, []);

  let elements = [];

  let uniqueGenes;
  let uniquePatProteins;

  let intIds = [];
  let domIds = [];
  let conIds = [];

  const idDict = {
    interolog: intIds,
    domain: domIds,
    consensus: conIds
  }

  if (data.payload) {
    console.log(data);
    elements = data.payload.results.map((item) => {
      const id = `${item.interactionType}-${item.gene}-${item.pathogenProtein}`;
      idDict[item.interactionType].push(`#${id}`);

      return {data: { source: item.gene, target: item.pathogenProtein, id: id} };
    });

    uniqueGenes = Array.from(new Set(data.payload.results.map(item => {return item.gene})));
    uniquePatProteins = Array.from(new Set(data.payload.results.map(item => {return item.pathogenProtein})));

    console.log(uniqueGenes);

    for (let item of uniqueGenes) {
      elements.push({ data: {id: item, label: item, className: 'host'}});
    }

    for (let item of uniquePatProteins) {
      elements.push({ data: {id: item, label: item, className: 'pat'}});
    }

    for (let i of elements) {
      console.log(i)
    }

    // This is a dumb hack that forces the graph to rerender. Don't ask.
    layout = {name: 'cose-bilkent'};
  }

  return (
    <div>
      <div className="cy">
        <CyComp elements={elements}
            cy={(cy) => {
              cyRef = cy;
              if (uniqueGenes) {
                const geneIds = uniqueGenes.map(item => {return `#${item}`});
                for (let id of geneIds) {
                  cyRef.$(id).style({'background-color': '#e08351'});
                }
              }

              if (uniquePatProteins) {
                const patIds = uniquePatProteins.map(item => {return `#${item}`});
                for (let id of patIds) {
                  cyRef.$(id).style({'background-color': '#266bbf'});
                }
              }

              for (let id of intIds) {
                cyRef.$(id).style({'line-color': '#c76181'});
              }

              for (let id of domIds) {
                cyRef.$(id).style({'line-color': '#b560cc'});
              }

              for (let id of conIds) {
                cyRef.$(id).style({'line-color': '#7856c7'});
              }
            }}
            style={ { width: 'auto', height: '700px' } }
            layout={layout} className="cy-container"/>
      </div>

      <Row className="mt-3">
        <Col sm={4} className="text-left">
          <Button className="kbl-btn-1 px-3 mr-4" title="Download JSON" onClick={() => {
              const cyJson = cyRef.json();
              const str = JSON.stringify(cyJson);
              const bytes = new TextEncoder().encode(str);
              const blob = new Blob([bytes], {
                  type: "application/json;charset=utf-8"
              });
              console.log(blob);
              FileSaver.saveAs(blob, 'chart.json');
            }}>
            <b>JSON</b>
          </Button>

          <IconContext.Provider value={{ className: "dl-icon" }}>
            <FaImage title="Download PNG" onClick={() => {
                const file = cyRef.png();
                FileSaver.saveAs(file, 'chart.png');
              }} />
          </IconContext.Provider>
        </Col>

        <Col sm={4}>

        </Col>
      </Row>
    </div>
  );
}
