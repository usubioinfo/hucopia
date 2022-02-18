import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Image} from 'react-bootstrap';
import Human from '../../images/human.png';
import Virus from '../../images/virus.png';
import Result from '../../images/table.png';
import Network from '../../images/network.png';
export class Help extends Component {

    render() {
        return (
            <div>
                <h3 className="display-4" align="Center"> HuCoPIA Tutorial</h3>
            <Row className="justify-content-center" >
               
                <Col md={2}>
              
                    <div className="card m-b-20 card-body"  >
                        <a href="#intro_loading" className="btn btn-sm btn-block btn-primary  my-1">Introduction</a>
                        <a href="#human" className="btn btn-sm btn-block btn-danger  my-1">Human Search</a>
                        <a href="#virus" className="btn btn-sm btn-block btn-info my-1">Virus Search</a>
                        <a href="#interactions" className="btn btn-sm btn-block btn-secondary my-1 ">Results</a>
                        <a href="#result_options" className="btn btn-sm btn-block btn-light my-1">Network Visualization</a>
                        <a href="#browser_compatibility" className="btn btn-sm btn-block btn-warning my-1">Browser Compability</a>
                    </div>
                </Col>
                <Col md={8}>
                <div className="card m-b-20 card-body" >
                        <div id="intro_loading" ></div>
                        <h4><b className="text-muted2">Introduction</b></h4>
                        <p className='text-justify'>Help section page of HuCoPIA, here you will find a step by step guide to search and display the result of interactions, as well as the different options regarding search on HuCoPIA and what each parameter means. If you have any questions that are not covered in this page please send an email to naveen.duhan@usu.edu.
                            For this tutorial we will use the Demo data, so if you want to replicate the results obtained in this tutorial just click in the load Sample Data.</p>
                        <div id="human" className="card my-2" ></div>
                        <h4><b className="text-muted2">Human Search Criteria</b></h4>
                        <p className='text-justify'>HuCoPIA supports text format. You can either upload a file or paste your gene ids in the text area. Select a functional annotation type.</p>
                        <Image src={Human} className="align-items-center" width={600} alt="Image of Naveen Duhan" style={{ alignSelf: 'center' }}/>
                        <p className='text-justify'>User can also select a specific term using the select annotation term button from Tissue Expression, Localization, Gene Ontology and KEGG pathways </p>
                        <div id="virus"  className="card my-2"></div>
                        
                        <h4><b className="text-muted2">Virus Search Criteria</b></h4>
                        <p className='text-justify'>For virus search user can select a virus strain, interaction type, and interaction category. Unique category provides only unique interactions for the selected virus strain, common category provides common interactions between all three virus strains , and both category provides unique and common interactions for the slected strain.</p>
                        <Image src={Virus} className="align-items-center" width={600} alt="Image of Naveen Duhan" style={{ alignSelf: 'center' }}/>
                        <div id="interactions" className="card my-2" ></div>
                        <h4><b className="text-muted2">Results</b></h4>
                        <p className='text-justify'>Show interactions shows results table which can be downloaded in a comma-separated file. User can also search specific term using the search panel above the table.</p>
                        <Image src={Result} className="align-items-center" width={800} alt="Image of Naveen Duhan" style={{ alignSelf: 'center' }}/>
                        <div id="result_options" className="card my-2" ></div>
                        <h4><b className="text-muted2">Network Visualization</b></h4>
                        <p className='text-justify'>Interaction from table can be visualized using network visualization button above the result table. The network can be downloaded in a png format or json format which can be visualized in external network visualization tools.  </p>
                        <Image src={Network} className="align-items-center" width={800} alt="Image of Naveen Duhan" style={{ alignSelf: 'center' }}/>
                        <div id="browser_compatibility" className="card my-2" ></div>
                        <h4><b className="text-muted2">Browser Compatibility</b></h4>
                        <p className='text-justify'>HuCoPIA have been tested in the following setups.</p>

                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>OS</th>
                                <th>Version</th>
                                <th>Chrome</th>
                                <th>Firefox</th>
                                <th>Safari</th>
                                <th>Opera</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Linux</td>
                                <td>Ubuntu 20.04</td>
                                <td>87.0.4280.88</td>
                                <td>84.0.2</td>
                                <td>n/a</td>
                                <td>58.0.3135.53</td>
                            </tr>
                            <tr>
                                <td>MacOS</td>
                                <td>Mojave 10.14.2</td>
                                <td>72.0.3626.121</td>
                                <td>65.0.1</td>
                                <td>12.0.2</td>
                                <td>not tested</td>
                            </tr>
                            <tr>
                                <td>Windows</td>
                                <td>10</td>
                                <td>72.0.3626.121</td>
                                <td>63.0.3</td>
                                <td>not tested</td>
                                <td>45.0.2552.888</td>
                            </tr>
                            </tbody>
                        </table>
               </div>
                </Col>
              </Row>
              </div> 

        )
}
}