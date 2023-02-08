import React, { Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { HNavbar } from 'components/HNavbar/HNavbar';
import { Home } from 'pages/Home/Home';
import { DataSet } from 'pages/DataSet/DataSet';
import {About} from 'pages/About/About';
import {Help} from 'pages/Help/Help';

import { ExpResultsTable } from 'components/ExpResultsTable/ExpResultsTable';
import { GoResultsTable } from 'components/GoResultsTable/GoResultsTable';
import { KeggResultsTable } from 'components/KeggResultsTable/KeggResultsTable';
import { LocalResultsTable } from 'components/LocalResultsTable/LocalResultsTable';

import { VisPage } from 'pages/VisPage/VisPage';

import { env } from 'env.js';
import ReactGA from 'react-ga';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';




export class HContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tissueResults: [],
      baseUrlLen: env.BASE_URL.split('/').length
    }

    this.getTissueData = this.getTissueData.bind(this);
    console.log(`Env: ${env.BASE_URL}`);
  }

  getTissueData(data) {
    console.log(data);
    window.history.replaceState(null, 'Test', '/tissue');
  }

  setGA = () => {
    ReactGA.initialize('G-W40R9CHGXY');
    ReactGA.pageview(window.location.pathname + window.location.search);
  };

  componentDidMount(){
    this.setGA();
  }
  render() {
    return (
      <Router>
        <Container fluid className="App px-4">
          <HNavbar active={document.location.pathname.split('/')[this.state.baseUrlLen]}/>
          <Switch>
             <Route path={`${env.BASE_URL}/home`}>
              <Home sendTissueData={this.getTissueData} />
            </Route>
            <Route path={`${env.BASE_URL}/about`}>
              <About />
            </Route>

            <Route path={`${env.BASE_URL}/dataset`}>
              <DataSet />
            </Route>
            <Route path={`${env.BASE_URL}/help`}>
              <Help />
            </Route>

            <Route path={`${env.BASE_URL}/tissue/result/:id`}>
              <Container fluid className="py-5">
                <Row className="justify-content-center">
                  <Col sm={11}>
                    <ExpResultsTable/>
                  </Col>
                </Row>
              </Container>
            </Route>

            <Route path={`${env.BASE_URL}/gene/result/:id`}>
              <Container fluid className="py-5">
                <Row className="justify-content-center">
                  <Col sm={11}>
                    <GoResultsTable/>
                  </Col>
                </Row>
              </Container>
            </Route>

            <Route path={`${env.BASE_URL}/kegg/result/:id`}>
              <Container fluid className="py-5 px-5">
                <Row className="justify-content-center">
                  <Col sm={11}>
                    <KeggResultsTable/>
                  </Col>
                </Row>
              </Container>
            </Route>

            <Route path={`${env.BASE_URL}/local/result/:id`}>
              <Container fluid className="py-5 px-5">
                <LocalResultsTable/>
              </Container>
            </Route>

            <Route path={`${env.BASE_URL}/vis/:id`}>
              <Container fluid className="py-5 px-5">
                <VisPage/>
              </Container>
            </Route>
        </Switch>
        </Container>
      </Router>);
  }
}
