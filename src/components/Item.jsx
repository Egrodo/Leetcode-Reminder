import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { distanceInWordsToNow, isToday } from 'date-fns';
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
    // this might need to be componentWillReceiveprops

    const { link, date } = this.props.item;

    let name = /problems[^/]*\/(.*?)(\/|$)/.exec(link)[1].split('-');
    name = name.map(v => `${v[0].toUpperCase()}${v.slice(1)}`).join(' ');
    this.setState({
      name,
      link,
      date,
    });
  }

  render() {
    const { name, link, date } = this.state;
    return (
      <section className={`Item${this.props.item.done ? ' done' : ''}`}>
        <span className="infoContainer" alt="info" title="More Info">
          <svg xmlns="http://www.w3.org/2000/svg" className="info" viewBox="0 0 100 100">
            <path d="M50.433,0.892c-27.119,0-49.102,21.983-49.102,49.102s21.983,49.103,49.102,49.103s49.101-21.984,49.101-49.103S77.552,0.892,50.433,0.892z M59,79.031C59,83.433,55.194,87,50.5,87S42,83.433,42,79.031V42.469c0-4.401,3.806-7.969,8.5-7.969s8.5,3.568,8.5,7.969V79.031z M50.433,31.214c-5.048,0-9.141-4.092-9.141-9.142c0-5.049,4.092-9.141,9.141-9.141c5.05,0,9.142,4.092,9.142,9.141C59.574,27.122,55.482,31.214,50.433,31.214z" />
          </svg>
        </span>
        <span className="textContainer">
          <a href={link} rel="noopener noreferrer" target="_blank" alt={name} title={name}>
            {name}
          </a>
          <div className="dateContainer">

            {isToday(date) ? 'Today' : `in ${distanceInWordsToNow(date)}`}
          </div>
        </span>
        <span className="checkContainer" title="Mark as done" alt="done checkmark">
          <svg xmlns="http://www.w3.org/2000/svg" className="check" viewBox="0 0 24 24">
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
          </svg>
        </span>
      </section>
    );
  }
}

Item.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
};

Item.defaultProps = {
  item: {},
};

export default Item;
