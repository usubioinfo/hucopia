import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import cb from 'cytoscape-cose-bilkent';
import CyComp from 'react-cytoscapejs';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import * as ResultService from 'services/result.service';

import './Visualization.scss';

cytoscape.use(cb);

export const Visualization = () => {
  let cy = cytoscape;

  const { id } = useParams();
  let [data, setData] = useState([]);

  let layout = {
    name: 'cose-bilkent'
  }

  useEffect(() => {
    const fetchData = async () => {
      const results = await ResultService.getResultById(id);

      setData(results);
    }

    fetchData();
  }, []);

  let elements = [];

  if (data.payload) {
    console.log(data);
    elements = data.payload.results.map((item) => {
      return {data: { source: item.gene, target: item.pathogenProtein} };
    });

    let uniqueGenes = Array.from(new Set(data.payload.results.map(item => {return item.gene})));
    let uniquePatProteins = Array.from(new Set(data.payload.results.map(item => {return item.pathogenProtein})));

    console.log(uniqueGenes);

    for (let item of uniqueGenes) {
      elements.push({ data: {id: item, label: item}});
    }

    for (let item of uniquePatProteins) {
      elements.push({ data: {id: item, label: item}});
    }

    for (let i of elements) {
      console.log(i)
    }

    // This is a dumb hack that forces the graph to rerender. Don't ask.
    layout = {name: 'cose'};
  }

  return (
    <div className="cy">
      <CyComp elements={elements} cy={(cy) => {cy = cytoscape}} style={ { width: 'auto', height: '600px' } }
          layout={layout} className="cy-container"/>
    </div>
  );
}
