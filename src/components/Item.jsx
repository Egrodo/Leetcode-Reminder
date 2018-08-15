import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Item.css';

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
      <section className="Item">
        <span className="infoContainer">
          <svg xmlns="http://www.w3.org/2000/svg" className="info" viewBox="0 0 20 20">
            <path d="M9.5 16A6.61 6.61 0 0 1 3 9.5 6.61 6.61 0 0 1 9.5 3 6.61 6.61 0 0 1 16 9.5 6.63 6.63 0 0 1 9.5 16zm0-14A7.5 7.5 0 1 0 17 9.5 7.5 7.5 0 0 0 9.5 2zm.5 6v4.08h1V13H8.07v-.92H9V9H8V8zM9 6h1v1H9z" />
          </svg>
        </span>
        <span className="linkContainer">
          <a href={link} rel="noopener noreferrer" target="_blank" alt={name} title={name}>
            {name}
          </a>
        </span>
        <span className="checkContainer" title="done" alt="done checkmark">
          <svg xmlns="http://www.w3.org/2000/svg" className="check" alt="Done" title="Done" viewBox="0 0 24 24">
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
          </svg>
        </span>
        {/* <span className="dateContaienr">
          {date}
        </span> */}
      </section>
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
