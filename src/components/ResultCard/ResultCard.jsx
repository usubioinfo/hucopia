import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import { IconContext } from 'react-icons';
import { FaPencilAlt } from 'react-icons/fa';

import './ResultCard.scss';

export class ResultCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      inputActive: false,
      edited: false
    }

    this.nameField = React.createRef();

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value, edited: false});
  }

  render() {
    let name = this.state.name.length ? this.state.name : this.props.name;

    if (document.activeElement === this.nameField.current) {
      name = this.state.name;
    }

    return (
      <Col sm={3}>
        <div className="result-card my-2">

          <span>
            <input className="result-card-input" ref={this.nameField} type="text" value={name}
                onChange={this.handleNameChange}
                onKeyPress={(event) => {
                  this.setState({edited: true});
                }} onMouseOut={() => {document.activeElement.blur()}} />
          </span>

          <div>{this.props.type}</div>

        <a href={this.props.url} className="kbl-link" target="_blank" rel="noreferrer">See Results</a>
        </div>
      </Col>
    );
  }
}
