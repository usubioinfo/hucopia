import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class TissueResults extends Component {

  constructor(props) {
    super(props);

    console.log(this.props.results);
  }

  render() {
    console.log(this.props.location);
    return (<div>{this.props.location.pathname}</div>);
  }
}

export default withRouter(TissueResults);
