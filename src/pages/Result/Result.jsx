import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import env from 'react-dotenv';

class Result extends Component {
  constructor() {
    super();

    this.state = {

    };
  }

  componentDidMount() {
    const { id } = useParams();
    axios.get(`${env.BACKEND}/expression/annotations`)
      .then(res => {
        console.log(res.data);
        this.setState({tissueOptions: res.data.payload});
      });
  }

  render() {
    return (
      <div></div>
    );
  }
}
