import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { HNavbar } from 'components/HNavbar/HNavbar';
import { Home } from 'pages/Home/Home';
import TissueResults from 'pages/TissueResults/TissueResults';

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
      tissueResults: []
    }

    this.getTissueData = this.getTissueData.bind(this);
  }

  getTissueData(data) {
    console.log(data);
    window.history.replaceState(null, 'Test', '/tissue');
  }

  render() {
    return (
      <Router>
        <Container fluid className="App px-0">
          <HNavbar active={document.location.pathname.split('/')[1]}/>
          <div>{document.location.pathname.split('/')[0]}</div>
          <Switch>
            <Route path="/">
              <Home sendTissueData={this.getTissueData} />
            </Route>
            <Route path="/tissue" render={props => <TissueResults results={this.state.tissueResults} {...props} />} />
          </Switch>
        </Container>
      </Router>);
  }
}
