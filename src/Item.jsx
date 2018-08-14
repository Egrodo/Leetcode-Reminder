import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/Item.css';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      link: '',
      date: '',
    };
  }

  componentWillMount() {
    // TODO: Does this need to be comp will rec props?
    const { link, date } = this.props.item;

    // TODO: Redo as regex.
    const name = link.split('/').pop().split('-').join(' ');

    this.setState({
      name,
      link,
      date,
    });
  }

  render() {
    const { name, link, date } = this.state;
    return (
      <div className="Item">
        <span className="linkContainer">
          <a href={link} rel="noopener noreferrer" target="_blank" alt={name} title={name}>
            {name}
          </a>
        </span>
        <span className="svgContainer" title="done" alt="done checkmark">
          <svg xmlns="http://www.w3.org/2000/svg" id="check" className="check" alt="Done" title="Done" viewBox="0 0 24 24">
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
          </svg>
        </span>
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.objectOf(PropTypes.string),
};

Item.defaultProps = {
  item: {},
};

export default Item;
