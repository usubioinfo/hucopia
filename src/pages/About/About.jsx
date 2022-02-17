import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './About.scss';
export class About extends Component {

    render() {
        return (
          <div>
            <Row className="justify-content-center">
            <Col sm={8}>
                <h3 className='my-2'>About HuCoPIA</h3>
<p className='text-left t-about' >
SARS-CoV-2, a novel betacoronavirus strain, has caused a pandemic that has claimed the lives of nearly half billion people. Vaccines and medicines are being developed around the world to reduce disease spread and fatality rates. Understanding the protein-protein interaction mechanism of SARS-CoV-2 and human is crucial for these efforts. These interactions might be used to assess vaccination effectiveness, diagnose exposure, and produce effective biotherapeutics. Here we present HuCoPIA database, which contains approximately 100,000 protein-protein interactions between human and three strain (SARS-CoV-2, SARS-CoV and MERS) of betacoronavirus. The interactions in the database are divided into common interactions between all three strains and unique to each strain. It also contains relevant function annotation information of human proteins.
</p>
<p className='text-left t-about' >
The HuCoPIA database contains SARS-CoV-2 (41,173), SARS-CoV (31,997), and MERS (26,862) interactions with functional annotation of human proteins like sub-cellular localization, tissue-expression, KEGG pathway and Gene ontology. We believe HuCoPIA will sereve as an invaluable resource to diverse experimental biologists and will help advance the research in the understanding the mechanism of betacoronaviruses.

</p>
                </Col>
                </Row>
 
                </div>
        )
}
}