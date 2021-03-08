import React from 'react';
import './HChip.scss';

import { FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons';

export class HChip extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: false
    };
  }

  setSelected() {
    this.setState((state) => {
      return {selected: !state.selected}
    });
  }

  render() {

    let icon = (<IconContext.Provider value={{ className: "selected-icon ml-2" }}>
              <FaTimes/>
            </IconContext.Provider>);

    return (
      <div className="h-chip" onClick={(e) => {
          this.props.ch(this.props.text)
        }}>
        {this.props.text}
        {icon}
      </div>
    );
  }
}
