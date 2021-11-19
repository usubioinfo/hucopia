import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class DataSet extends Component {

  constructor() {
    super();
    this.state = {
      data: [
        {
          id: 'MT007544.1',
          isolate: 'australia',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate Australia/VIC01/2020'
        },
        {
          id: 'MT126808.1',
          isolate: 'brazil',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/BRA/SP02/2020'
        },
        {
          id: 'MT291836.1',
          isolate: 'china_Beijing',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/CHN/Wuhan_IME-BJ07/2020'
        },
        {
          id: 'MT019532.1',
          isolate: 'china_hw',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate BetaCoV/Wuhan/IPBCAMS-WH-04/2019'
        },
        {
          id: 'NC_045512.2',
          isolate: 'china_ref',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate Wuhan-Hu-1'
        },
        {
          id: 'MT121215.1',
          isolate: 'china_Shanghai',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/CHN/SH01/2020'
        },
        {
          id: 'MT256924.2',
          isolate: 'colombia',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/COL/79256_Antioquia/2020'
        },
        {
          id: 'LC528233.1',
          isolate: 'diamond_cruise',
          description: 'Severe acute respiratory syndrome coronavirus 2 SARS-CoV-2/Hu/DP/Kng/19-027 RNA'
        },
        {
          id: 'MT320538.2',
          isolate: 'france',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/FRA/KRA-ROB/2020'
        },
        {
          id: 'MT328035.1',
          isolate: 'greece',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/GRC/13/2020'
        },
        {
          id: 'MT114419.1',
          isolate: 'hongkong',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/HKG/HKU-908b/2020'
        },
        {
          id: 'MT050493.1',
          isolate: 'india',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/IND/166/2020'
        },
        {
          id: 'MT320891.2',
          isolate: 'iran',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/IRN/HGRC-1.1-IPI-8206/2020'
        },
        {
          id: 'MT276598.1',
          isolate: 'israel',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/ISR/ISR_IT0320/2020'
        },
        {
          id: 'MT077125.1',
          isolate: 'italy',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/ITA/INMI1/2020'
        },
        {
          id: 'LC534419.1',
          isolate: 'japan',
          description: 'Severe acute respiratory syndrome coronavirus 2 SARS-CoV-2/Hu/Kng/19-437 RNA'
        },
        {
          id: 'MT072688.1',
          isolate: 'nepal',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/NPL/61-TW/2020'
        },
        {
          id: 'MT240479.1',
          isolate: 'pakistan',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/PAK/Gilgit1/2020'
        },
        {
          id: 'MT263074.1',
          isolate: 'peru',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/PER/Peru-10/2020'
        },
        {
          id: 'MT304476.1',
          isolate: 's_korea',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/KOR/BA-ACH_2719/2020'
        },
        {
          id: 'MT324062.1',
          isolate: 'south_africa',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/ZAF/R03006/2020'
        },
        {
          id: 'MT359866.1',
          isolate: 'spain',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/ESP/VH198152683/2020'
        },
        {
          id: 'MT093571.1',
          isolate: 'sweden',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/SWE/01/2020'
        },
        {
          id: 'MT066176.1',
          isolate: 'taiwan',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/NTU02/TWN/human/2020'
        },
        {
          id: 'MT327745.1',
          isolate: 'turkey',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/TUR/ERAGEM-001/2020'
        },
        {
          id: 'MT276324.1',
          isolate: 'usa-ca',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/USA/CA_2602/2020'
        },
        {
          id: 'MT325627.1',
          isolate: 'usa-ny',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/USA/NY_1922/2020'
        },
        {
          id: 'MT334561.1',
          isolate: 'usa-ut',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/USA/UT-00301/2020'
        },
        {
          id: 'MT358644.1',
          isolate: 'usa-wa',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/USA/WA-UW-4180/2020'
        },
        {
          id: 'MT192773.1',
          isolate: 'vietnam',
          description: 'Severe acute respiratory syndrome coronavirus 2 isolate SARS-CoV-2/human/VNM/nCoV-19-02S/2020'
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Row className="justify-content-center">
          <Col sm={8}>
            <Table responsive className="kbl-table table-borderless">
              <thead className="kbl-thead">
                <tr className="top">
                  <th className="pathogen">ID</th>
                  <th className="human">Isolate</th>
                  <th className="interaction">Description</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(this.state.data).map((result, index) => (
                  <tr key={index}>
                    <td>
                      <a href={'https://www.ncbi.nlm.nih.gov/nuccore/' + result['id']} rel="noreferrer" target="_blank">
                        {result['id']}
                      </a>
                      </td>
                    <td>{result['isolate']}</td>
                    <td>{result['description']}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}
