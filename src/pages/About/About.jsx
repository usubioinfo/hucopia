import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './About.scss';

export class About extends Component {

    render() {
        return (
          <div>
            <Row className="justify-content-center">
                <Col sm={6}>
                    <h3 className='my-2'>About HuCoPIA</h3>

                    <p className='text-left t-about'>
                        SARS-CoV-2, a novel betacoronavirus strain, has caused a pandemic that has infected nearly half a billion people. 
                        Vaccines and medicines are being developed around the world to reduce disease spread and fatality rates. Understanding the 
                        protein-protein interaction mechanisms of SARS-CoV-2 in humans is crucial for these efforts. These interactions can be used to 
                        assess vaccination effectiveness, population exposure, and biotherapeutic efficacy. We present the HuCoPIA database, 
                        which contains approximately 100,000 protein-protein interactions between human proteins and three strains (SARS-CoV-2, SARS-CoV and MERS)
                        of betacoronavirus. The interactions in the database are divided into common interactions between all three strains and unique interactions to 
                        each strain. It also contains relevant function annotation information of human proteins.
                    </p>
                    <p className='text-left t-about'>
                        The HuCoPIA database contains SARS-CoV-2 (41,173), SARS-CoV (31,997), and MERS (26,862) interactions with functional annotation 
                        of human proteins, like subcellular localization, tissue expression, KEGG pathways, and gene ontology. HuCoPIA can serve as 
                        an invaluable resource to a diverse group of experimental biologists and will help advance the research on various mechanisms of 
                        betacoronaviruses.
                    </p>
                </Col>
            </Row>
 
          </div>
        )
}
}
