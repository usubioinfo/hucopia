import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { HNavbar } from 'components/HNavbar/HNavbar';
import { Home } from 'pages/Home/Home';
import TissueResults from 'pages/TissueResults/TissueResults';
import { ResultsTable } from 'components/ResultsTable/ResultsTable';

import { env } from 'env.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  withRouter
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

  render() {
    return (
      <Router>
        <Container fluid className="App px-0">
          <HNavbar active={document.location.pathname.split('/')[this.state.baseUrlLen]}/>
          <Switch>
            <Route path={`${env.BASE_URL}/home`}>
              <Home sendTissueData={this.getTissueData} />
            </Route>
            <Route path={`${env.BASE_URL}/tissue`} render={props => <TissueResults results={this.state.tissueResults} {...props} />} />
            <Route path={`${env.BASE_URL}/exp/result/:id`}>
              <Container>
                <ResultsTable/>
              </Container>
            </Route>
        </Switch>
        </Container>
      </Router>);
  }
}
