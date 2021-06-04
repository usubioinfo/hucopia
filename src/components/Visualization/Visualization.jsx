import React, { Component } from 'react';
import cytoscape from 'cytoscape';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as ResultService from 'services/result.service';

import './Visualization.scss';

export const Visualization = () => {
  const { id } = useParams();
  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await ResultService.getResultById(id);
      console.log(results);
      setData(results);
    }

    fetchData();
  }, []);

  return (
    <div></div>
  );
}
