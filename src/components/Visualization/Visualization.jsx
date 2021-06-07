import React, { Component } from 'react';
import CyComp from 'react-cytoscapejs';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as ResultService from 'services/result.service';

import './Visualization.scss';

export const Visualization = () => {
  const { id } = useParams();
  let [data, setData] = useState([]);

  const elements = [
       { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
       { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
       { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
    ];

  const style = [

  ]

  useEffect(() => {
    const fetchData = async () => {
      const results = await ResultService.getResultById(id);
      console.log(results);
      setData(results);
    }

    fetchData();
  }, []);

  return (
    <div className="cy">
      <CyComp elements={elements} style={ { width: 'auto', height: '600px' } } className="cy-container"/>
    </div>
  );
}
