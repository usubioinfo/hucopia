import React from 'react';
import './HSelector.scss';

import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

export class HSelector extends React.Component {

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

    let icon;

    if (this.props.selected) {
      icon = (<IconContext.Provider value={{ className: "selected-icon mr-1" }}>
                <FaRegDotCircle/>
              </IconContext.Provider>);
    } else {
      icon = (<IconContext.Provider value={{ className: "selected-icon mr-1" }}>
                <FaRegCircle/>
              </IconContext.Provider>);
    }

    return (
      <div className="h-selector" onClick={(e) => {
          this.props.ch(this.props.name)
        }}>
        {icon}
        {this.props.text}
      </div>
    );
  }
}
