import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as ResultService from 'services/result.service';

import './VisTable.scss';

export const VisTable = ({tableRowClicked, handleSearchChange}) => {
  const { id } = useParams();
  let [data, setData] = useState([]);
  let [totalData, setTotalData] = useState([]);
  let [tableData, setTableData] = useState([]);
  let [searchTerm, setSearchTerm] = useState('');

  const proteins = [];

  useEffect(() => {
    const fetchData = async () => {
      const results = await ResultService.getResultById(id);
      setData(results);

      if (results.payload && results.payload.reqTime) {
        setTableData(results.payload.results);
        setTotalData(results.payload.results);
        console.log(results);
      }
    }

    fetchData();
  }, []);

  let results;

  if (data.payload && data.payload.reqTime) {
    results = (
      <Table responsive className="kbl-table table-borderless">
        <thead className="kbl-thead">
          <tr className="top">
            <th></th>
            <th colSpan="1" className="pathogen">Host</th>
            <th colSpan="1" className="human">Pathogen</th>
          </tr>

          <tr className="bottom">
            <th className="light">#</th>
            <th className="light">Gene</th>
            <th className="dark">Protein</th>
          </tr>
        </thead>

        <tbody>
          {Array.from(tableData).map((result, index) => (
            <tr className="select" key={index} onClick={() => {
              const data = {
                source: result.gene,
                target: result.pathogenProtein,
                gene: result.gene,
                pathogenProtein: result.pathogenProtein,
                id: `${result.interactionType}-${result.gene}-${result.pathogenProtein}`
              };

              tableRowClicked(data);

              }}>
              <td>{index + 1}</td>
              <td>{result.gene}</td>
              <td>{result.pathogenProtein}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  return (
    <div>
      <Row className="justify-content-center mb-4">
        <Col sm={12} className="px-4">
          <Form.Control className="kbl-form" type="email" placeholder="Search" value={searchTerm}
            onChange={(event) => {
              const searchTerm = event.target.value.toLowerCase();

              setSearchTerm(searchTerm);
              handleSearchChange(searchTerm);
              console.log(searchTerm);
              if (event.target.value === '') {
                const newData = data.payload.results;
                setTableData(newData);
              } else {
                const newData = totalData.filter((item) => {
                  return item.gene.toLowerCase().includes(searchTerm) || item.pathogenProtein.toLowerCase().includes(searchTerm)
                });

                setTableData(newData);
              }
            }
          }/>
        </Col>
      </Row>
      {results}
    </div>
  );
}
