import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './List';
import '../css/History.css';

class History extends Component {
  // Displays previously completed items.
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    this.setState({ data: this.props.data });
  }

  // TODO: Only display past / done.
  render() {
    const { data } = this.state;
    return (
      <section className="History page">
        <header className="primary">Past Challenges:</header>
        <List data={data} />
      </section>
    );
  }
}

History.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
};

History.defaultProps = {
  data: null,
};

export default History;
