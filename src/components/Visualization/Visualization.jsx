import React, { Component } from 'react';
import CyComp from 'react-cytoscapejs';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import * as ResultService from 'services/result.service';

import './Visualization.scss';

export const Visualization = () => {

  const { id } = useParams();
  let [data, setData] = useState([]);

  const layout = {
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
  }

  return (
    <div className="cy">
      <CyComp elements={elements} style={ { width: 'auto', height: '600px' } } layout={layout} className="cy-container"/>
    </div>
  );
}
